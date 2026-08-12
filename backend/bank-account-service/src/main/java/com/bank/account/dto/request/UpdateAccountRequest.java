package com.bank.account.dto.request;

import com.bank.account.entity.Account.AccountType;

public class UpdateAccountRequest {
	private AccountType accountType;

	public UpdateAccountRequest() {}

	public UpdateAccountRequest(AccountType accountType) {
		this.accountType = accountType;
	}

	public AccountType getAccountType() { return accountType; }
	public void setAccountType(AccountType accountType) { this.accountType = accountType; }
}
