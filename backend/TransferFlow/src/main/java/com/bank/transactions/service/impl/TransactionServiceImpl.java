package com.bank.transactions.service.impl;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bank.transactions.client.AccountClient;
import com.bank.transactions.dto.AccountDto;
import com.bank.transactions.dto.FraudCheckRequestDto;
import com.bank.transactions.dto.FraudDecisionRecordDto;
import com.bank.transactions.dto.FraudResponseDto;
import com.bank.transactions.dto.TransactionConfirmRequestDto;
import com.bank.transactions.dto.TransactionResponseDto;
import com.bank.transactions.dto.TransferRequestDto;
import com.bank.transactions.entity.Transaction;
import com.bank.transactions.enums.TransactionStatus;
import com.bank.transactions.enums.TransactionType;
import com.bank.transactions.exception.InsufficientBalanceException;
import com.bank.transactions.exception.TransactionException;
import com.bank.transactions.fraud.FraudCheckService;
import com.bank.transactions.repository.TransactionRepository;
import com.bank.transactions.service.TransactionService;
import com.bank.transactions.util.ReferenceGenerator;

@Service
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountClient accountClient;
    private final FraudCheckService fraudCheckService;

    public TransactionServiceImpl(TransactionRepository transactionRepository,
                                   AccountClient accountClient,
                                   FraudCheckService fraudCheckService) {
        this.transactionRepository = transactionRepository;
        this.accountClient = accountClient;
        this.fraudCheckService = fraudCheckService;
    }

    @Override
    @Transactional
    public TransactionResponseDto transfer(TransferRequestDto request) {

        validateNotSameAccount(request.getFromAccountId(), request.getToAccountId());

        AccountDto sender = accountClient.getAccountById(request.getFromAccountId());
        AccountDto receiver = accountClient.getAccountById(request.getToAccountId());

        validateAccountsActive(sender, receiver);
        validateSufficientBalance(sender, request.getAmount());

        String city = (request.getTransactionCity() != null && !request.getTransactionCity().isBlank()) ? request.getTransactionCity() : "Pune";
        String ip = (request.getClientIpAddress() != null && !request.getClientIpAddress().isBlank()) ? request.getClientIpAddress() : "127.0.0.1";

        // Business Rule: Amounts < ₹50,000 bypass Fraud Detection completely
        if (request.getAmount().compareTo(new BigDecimal("50000")) < 0) {
            return executeAllowedTransfer(request, city);
        }

        // Business Rule: Amounts >= ₹50,000 invoke Fraud Detection Service & require Customer Confirmation
        FraudCheckRequestDto fraudRequest = new FraudCheckRequestDto();
        fraudRequest.setCustomerId(sender.getCustomerId());
        fraudRequest.setAccountId(sender.getAccountId());
        fraudRequest.setTransactionAmount(request.getAmount());
        fraudRequest.setTransactionType("TRANSFER");
        fraudRequest.setClientIpAddress(ip);
        fraudRequest.setCurrentTransactionCity(city);

        FraudResponseDto fraudResult = fraudCheckService.checkTransaction(fraudRequest);

        // DO NOT execute balance movement or save in transactions table during initial check for amounts >= ₹50,000.
        // Always return FLAGGED status so customer modal popup is presented.
        TransactionResponseDto flagged = new TransactionResponseDto(
                null,
                TransactionStatus.FLAGGED,
                fraudResult.getMessage() != null ? fraudResult.getMessage() : "Suspicious Transaction Detected"
        );
        flagged.setRiskScore(fraudResult.getRiskScore() > 0 ? fraudResult.getRiskScore() : 85);
        flagged.setAiExplanation(fraudResult.getAiExplanation());
        return flagged;
    }

    @Override
    @Transactional
    public TransactionResponseDto confirmTransfer(TransactionConfirmRequestDto confirmRequest) {
        validateNotSameAccount(confirmRequest.getFromAccountId(), confirmRequest.getToAccountId());

        AccountDto sender = accountClient.getAccountById(confirmRequest.getFromAccountId());
        AccountDto receiver = accountClient.getAccountById(confirmRequest.getToAccountId());

        String city = (confirmRequest.getTransactionCity() != null && !confirmRequest.getTransactionCity().isBlank()) ? confirmRequest.getTransactionCity() : "Pune";
        String ip = (confirmRequest.getClientIpAddress() != null && !confirmRequest.getClientIpAddress().isBlank()) ? confirmRequest.getClientIpAddress() : "127.0.0.1";

        boolean isAllowed = "Allowed".equalsIgnoreCase(confirmRequest.getCustomerDecision());

        Long customerIdLong = sender.getCustomerId() != null ? sender.getCustomerId().longValue() : 0L;
        Long accountIdLong = sender.getAccountId() != null ? sender.getAccountId().longValue() : 0L;

        if (isAllowed) {
            validateAccountsActive(sender, receiver);
            validateSufficientBalance(sender, confirmRequest.getAmount());

            TransferRequestDto transferReq = new TransferRequestDto(
                    confirmRequest.getFromAccountId(),
                    confirmRequest.getToAccountId(),
                    confirmRequest.getAmount(),
                    city
            );

            // Execute balance transfer and save into Transaction table ONLY when customer clicks "Allow Transfer"
            TransactionResponseDto result = executeAllowedTransfer(transferReq, city);

            // Record Fraud Event with Customer Decision = Allowed
            FraudDecisionRecordDto decisionRecord = new FraudDecisionRecordDto(
                    customerIdLong,
                    accountIdLong,
                    confirmRequest.getAmount(),
                    ip,
                    city,
                    confirmRequest.getRiskScore() != null ? confirmRequest.getRiskScore() : 85,
                    confirmRequest.getAiExplanation(),
                    "Allowed",
                    "Approved by customer security verification"
            );
            fraudCheckService.recordDecision(decisionRecord);

            return result;
        } else {
            // Customer clicked "Block Transfer": Cancel immediately, NO balance updates, NO row in Transaction table
            FraudDecisionRecordDto decisionRecord = new FraudDecisionRecordDto(
                    customerIdLong,
                    accountIdLong,
                    confirmRequest.getAmount(),
                    ip,
                    city,
                    confirmRequest.getRiskScore() != null ? confirmRequest.getRiskScore() : 85,
                    confirmRequest.getAiExplanation(),
                    "Blocked",
                    "Blocked by customer security verification"
            );
            fraudCheckService.recordDecision(decisionRecord);

            return new TransactionResponseDto(
                    null,
                    TransactionStatus.FLAGGED,
                    "Transfer Cancelled: Transaction blocked by customer request."
            );
        }
    }

    private void validateNotSameAccount(Integer fromId, Integer toId) {
        if (fromId.equals(toId)) {
            throw new TransactionException("Sender and receiver account cannot be the same");
        }
    }

    private void validateAccountsActive(AccountDto sender, AccountDto receiver) {
        if (!sender.isActive()) {
            throw new TransactionException("Sender account " + sender.getAccountId() + " is not ACTIVE");
        }
        if (!receiver.isActive()) {
            throw new TransactionException("Receiver account " + receiver.getAccountId() + " is not ACTIVE");
        }
    }

    private void validateSufficientBalance(AccountDto sender, BigDecimal amount) {
        if (sender.getBalance().compareTo(amount) < 0) {
            throw new InsufficientBalanceException(sender.getAccountId(), sender.getBalance(), amount);
        }
    }

    private TransactionResponseDto executeAllowedTransfer(
            TransferRequestDto request,
            String transactionCity) {
        AccountClient.TransferResult transferResult = accountClient.transfer(request);

        if (!"SUCCESS".equalsIgnoreCase(transferResult.getStatus())) {
            throw new TransactionException("Account Service did not confirm the transfer as successful");
        }

        String referenceNumber = ReferenceGenerator.generate();

        Transaction transaction = new Transaction(
                request.getFromAccountId(),
                TransactionType.TRANSFER,
                request.getAmount(),
                transferResult.getFromAccountBalance(),
                "Transfer to account " + request.getToAccountId(),
                LocalDateTime.now(),
                transactionCity,
                referenceNumber,
                TransactionStatus.SUCCESS
        );

        Transaction saved = transactionRepository.save(transaction);

        return new TransactionResponseDto(
                saved.getTransactionId(),
                TransactionStatus.SUCCESS,
                "Transfer Successful"
        );
    }
}
