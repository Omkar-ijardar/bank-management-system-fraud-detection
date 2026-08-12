package com.bank.account.dto.request;

import com.bank.account.entity.Account.AccountType;
import jakarta.validation.constraints.NotNull;

public class CreateAccountRequest {

	@NotNull(message ="customerId is required")
	private Integer customerId;
	
	@NotNull(message = "accountType is required")
	private AccountType accountType;
	
	@NotNull(message = "branchname is required")
	private String branchName;
	
	@NotNull(message = "ifscCode is required")
	private String ifscCode;

	public CreateAccountRequest() {}

	public CreateAccountRequest(Integer customerId, AccountType accountType, String branchName, String ifscCode) {
		this.customerId = customerId;
		this.accountType = accountType;
		this.branchName = branchName;
		this.ifscCode = ifscCode;
	}

	public Integer getCustomerId() { return customerId; }
	public void setCustomerId(Integer customerId) { this.customerId = customerId; }
	public AccountType getAccountType() { return accountType; }
	public void setAccountType(AccountType accountType) { this.accountType = accountType; }
	public String getBranchName() { return branchName; }
	public void setBranchName(String branchName) { this.branchName = branchName; }
	public String getIfscCode() { return ifscCode; }
	public void setIfscCode(String ifscCode) { this.ifscCode = ifscCode; }
}
