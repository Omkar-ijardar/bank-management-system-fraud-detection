package com.bank.transaction.service.impl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.bank.transaction.client.AccountServiceClient;
import com.bank.transaction.dto.request.DepositRequest;
import com.bank.transaction.dto.request.UpdateBalanceRequest;
import com.bank.transaction.dto.request.WithdrawRequest;
import com.bank.transaction.dto.response.AccountResponse;
import com.bank.transaction.dto.response.TransactionResponse;
import com.bank.transaction.entity.Transaction;
import com.bank.transaction.entity.TransactionStatus;
import com.bank.transaction.entity.TransactionType;
import com.bank.transaction.exception.InsufficientBalanceException;
import com.bank.transaction.exception.InvalidOperationException;
import com.bank.transaction.exception.ResourceNotFoundException;
import com.bank.transaction.repository.TransactionRepository;
import com.bank.transaction.service.TransactionService;

@Service
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;

    private final AccountServiceClient accountServiceClient;

    public TransactionServiceImpl(TransactionRepository transactionRepository,
                                  AccountServiceClient accountServiceClient) {
        this.transactionRepository = transactionRepository;
        this.accountServiceClient = accountServiceClient;
    }

    @Override
    public TransactionResponse deposit(DepositRequest request) {

        AccountResponse account =
                getAccount(request.getAccountId());

        BigDecimal updatedBalance =
                account.getBalance().add(request.getAmount());

        updateAccountBalance(
                request.getAccountId(),
                updatedBalance);

        Transaction transaction =
                saveTransaction(
                        request.getAccountId(),
                        TransactionType.Deposit,
                        request.getAmount(),
                        updatedBalance,
                        request.getDescription(),
                        request.getTransactionCity());

        return buildResponse(
                transaction,
                "Amount deposited successfully");
    }
    
    @Override
    public TransactionResponse withdraw(WithdrawRequest request) {

        AccountResponse account =
                getAccount(request.getAccountId());

        if (account.getBalance().compareTo(request.getAmount()) < 0) {
            throw new InsufficientBalanceException("Insufficient balance");
        }

        BigDecimal updatedBalance =
                account.getBalance().subtract(request.getAmount());

        updateAccountBalance(
                request.getAccountId(),
                updatedBalance);

        Transaction transaction =
                saveTransaction(
                        request.getAccountId(),
                        TransactionType.Withdraw,
                        request.getAmount(),
                        updatedBalance,
                        request.getDescription(),
                        request.getTransactionCity());

        return buildResponse(
                transaction,
                "Amount withdrawn successfully");
    }
	

    @Override
    public TransactionResponse getTransactionById(Integer transactionId) {

        Transaction transaction =
                transactionRepository.findById(transactionId)
                .orElseThrow(() ->
                        new RuntimeException("Transaction not found"));

        return buildResponse(
                transaction,
                "Transaction fetched successfully");
    }

	@Override
	public List<TransactionResponse> getTransactionHistory(Integer accountId) {
		List<Transaction> transactions =
				transactionRepository.findByAccountIdOrderByTransactionTimeDesc(accountId);

		return transactions.stream()
				.map(transaction ->
						buildResponse(
								transaction,
								"Transaction history fetched successfully"))
				.toList();
	}

	@Override
	public List<TransactionResponse> getAllTransactions() {
		return transactionRepository.findAll().stream()
				.map(t -> buildResponse(t, "Transaction fetched successfully"))
				.toList();
	}
	
	
	private AccountResponse getAccount(Integer accountId) {

	    AccountResponse account =
	            accountServiceClient.getAccountById(accountId);

	    if (account == null) {
	        throw new ResourceNotFoundException("Account not found");
	    }

	    if (!"Active".equalsIgnoreCase(account.getStatus())) {
	        throw new InvalidOperationException("Account is not active");
	    }

	    if (account.getBalance() == null) {
	        throw new InvalidOperationException("Account balance is missing");
	    }

	    return account;
	}
	
	
	private void updateAccountBalance(
	        Integer accountId,
	        BigDecimal updatedBalance) {

	    UpdateBalanceRequest request =
	            new UpdateBalanceRequest(updatedBalance);

	    accountServiceClient.updateBalance(
	            accountId,
	            request);
	}
	
	
	private Transaction saveTransaction(

	        Integer accountId,

	        TransactionType type,

	        BigDecimal amount,

	        BigDecimal availableBalance,

	        String description,

	        String city) {

	    Transaction transaction = new Transaction();

	    transaction.setAccountId(accountId);

	    transaction.setTransactionType(type);

	    transaction.setAmount(amount);

	    transaction.setAvailableBalance(availableBalance);

	    transaction.setDescription(description);

	    transaction.setTransactionCity(city);

	    transaction.setReferenceNumber(
	            generateReferenceNumber());

	    transaction.setTransactionTime(
	            LocalDateTime.now());

	    transaction.setStatus(
	            TransactionStatus.Success);

	    return transactionRepository.save(transaction);
	}
	
	
	private TransactionResponse buildResponse(

	        Transaction transaction,

	        String message) {

	    TransactionResponse response =
	            new TransactionResponse();

	    response.setTransactionId(
	            transaction.getTransactionId());

	    response.setAccountId(
	            transaction.getAccountId());

	    response.setReferenceNumber(
	            transaction.getReferenceNumber());

	    response.setTransactionType(
	            transaction.getTransactionType().name());

	    response.setAmount(
	            transaction.getAmount());

	    response.setAvailableBalance(
	            transaction.getAvailableBalance());

	    response.setTransactionCity(
	            transaction.getTransactionCity());

	    response.setStatus(
	            transaction.getStatus().name());

	    response.setTransactionTime(
	            transaction.getTransactionTime());

	    response.setMessage(message);

	    return response;
	}
	
	
	private String generateReferenceNumber() {
		return "TXN"
	            + UUID.randomUUID()
	                    .toString()
	                    .replace("-", "")
	                    .substring(0, 12)
	                    .toUpperCase();
	}

	@Override
	public Long getTotalTransactions() {
		return transactionRepository.count();
	}

	@Override
	public Long getSuccessfulTransactions() {
		return transactionRepository.countByStatus(TransactionStatus.Success);
	}

	@Override
	public Long getFailedTransactions() {
		return transactionRepository.countByStatus(TransactionStatus.Failed) + transactionRepository.countByStatus(TransactionStatus.Flagged) + transactionRepository.countByStatus(TransactionStatus.Blocked);
	}

	@Override
	public BigDecimal getTotalTransactionAmount() {
		BigDecimal total = transactionRepository.sumTotalAmount();
		return total != null ? total : BigDecimal.ZERO;
	}
}
    
    