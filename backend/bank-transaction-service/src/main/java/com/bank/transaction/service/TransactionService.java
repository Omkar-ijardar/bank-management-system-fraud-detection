package com.bank.transaction.service;

import java.util.List;

import com.bank.transaction.dto.request.DepositRequest;
import com.bank.transaction.dto.request.WithdrawRequest;
import com.bank.transaction.dto.response.TransactionResponse;

import jakarta.validation.Valid;

public interface TransactionService {
	
	TransactionResponse deposit(DepositRequest request);
	
	TransactionResponse withdraw(WithdrawRequest request);
	
	TransactionResponse getTransactionById(Integer transactionId);
	
	List<TransactionResponse> getTransactionHistory(Integer accountId);

	List<TransactionResponse> getAllTransactions();

	Long getTotalTransactions();

	Long getSuccessfulTransactions();

	Long getFailedTransactions();

	java.math.BigDecimal getTotalTransactionAmount();
}
