package com.bank.account.dto.response;

import java.math.BigDecimal;
import com.bank.account.entity.Account;

public class AccountResponse {
	private Integer accountId;
	private Integer customerId;
	private String accountNumber;
	private String accountType;
	private BigDecimal balance;
	private String branchName;
	private String ifscCode;
	private String status;

	public AccountResponse() {}

	public AccountResponse(Integer accountId, Integer customerId, String accountNumber, String accountType,
			BigDecimal balance, String branchName, String ifscCode, String status) {
		this.accountId = accountId;
		this.customerId = customerId;
		this.accountNumber = accountNumber;
		this.accountType = accountType;
		this.balance = balance;
		this.branchName = branchName;
		this.ifscCode = ifscCode;
		this.status = status;
	}

	public Integer getAccountId() { return accountId; }
	public void setAccountId(Integer accountId) { this.accountId = accountId; }
	public Integer getCustomerId() { return customerId; }
	public void setCustomerId(Integer customerId) { this.customerId = customerId; }
	public String getAccountNumber() { return accountNumber; }
	public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }
	public String getAccountType() { return accountType; }
	public void setAccountType(String accountType) { this.accountType = accountType; }
	public BigDecimal getBalance() { return balance; }
	public void setBalance(BigDecimal balance) { this.balance = balance; }
	public String getBranchName() { return branchName; }
	public void setBranchName(String branchName) { this.branchName = branchName; }
	public String getIfscCode() { return ifscCode; }
	public void setIfscCode(String ifscCode) { this.ifscCode = ifscCode; }
	public String getStatus() { return status; }
	public void setStatus(String status) { this.status = status; }
	
	public static AccountResponse fromEntity(Account account) {
		return new AccountResponse(
				account.getAccountId(),
				account.getCustomerId(),
				account.getAccountNumber(),
				account.getAccountType().name(),
				account.getBalance(),
				account.getBranchName(),
				account.getIfscCode(),
				account.getStatus().name()
				);
	}
}
