package com.bank.account.service;

import java.util.List;

import com.bank.account.dto.request.CreateAccountRequest;
import com.bank.account.dto.request.TransferRequest;
import com.bank.account.dto.request.UpdateAccountRequest;
import com.bank.account.dto.request.UpdateBalanceRequest;
import com.bank.account.dto.response.AccountResponse;
import com.bank.account.dto.response.TransferResponse;

import jakarta.validation.Valid;

public interface AccountService {

	AccountResponse createAccount(@Valid CreateAccountRequest request);

	AccountResponse getAccount(Integer accountId);

	List<AccountResponse> getAccountByCustomer(Integer customerId);

	AccountResponse updateAccount(Integer accountId, UpdateAccountRequest request);
	
	AccountResponse updateBalance(Integer accountId, UpdateBalanceRequest request);

	AccountResponse closeAccount(Integer accountId);

	TransferResponse transfer(TransferRequest request);

	List<AccountResponse> getAllAccounts();

	Long getTotalAccounts();

	Long getActiveAccounts();
}
