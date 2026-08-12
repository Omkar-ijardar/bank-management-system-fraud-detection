package com.bank.account.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="account")
public class Account {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer accountId;
	
	@Column(nullable = false)
	private Integer customerId;
	
	@Column(unique = true, nullable = false)
	private String accountNumber;
	
	@Enumerated(EnumType.STRING)
	private AccountType accountType;
	
	private BigDecimal balance = BigDecimal.ZERO;
	
	private String branchName;
	private String ifscCode;
	
	@Enumerated(EnumType.STRING)
	private AccountStatus status = AccountStatus.Active;
	
	private LocalDate openDate = LocalDate.now();
	
	public enum AccountType {Savings, Current, Salary}
	public enum AccountStatus {Active, Inactive, Blocked, Closed }

	public Account() {}

	public Account(Integer accountId, Integer customerId, String accountNumber, AccountType accountType,
			BigDecimal balance, String branchName, String ifscCode, AccountStatus status, LocalDate openDate) {
		this.accountId = accountId;
		this.customerId = customerId;
		this.accountNumber = accountNumber;
		this.accountType = accountType;
		this.balance = balance;
		this.branchName = branchName;
		this.ifscCode = ifscCode;
		this.status = status;
		this.openDate = openDate;
	}

	public Integer getAccountId() { return accountId; }
	public void setAccountId(Integer accountId) { this.accountId = accountId; }
	public Integer getCustomerId() { return customerId; }
	public void setCustomerId(Integer customerId) { this.customerId = customerId; }
	public String getAccountNumber() { return accountNumber; }
	public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }
	public AccountType getAccountType() { return accountType; }
	public void setAccountType(AccountType accountType) { this.accountType = accountType; }
	public BigDecimal getBalance() { return balance; }
	public void setBalance(BigDecimal balance) { this.balance = balance; }
	public String getBranchName() { return branchName; }
	public void setBranchName(String branchName) { this.branchName = branchName; }
	public String getIfscCode() { return ifscCode; }
	public void setIfscCode(String ifscCode) { this.ifscCode = ifscCode; }
	public AccountStatus getStatus() { return status; }
	public void setStatus(AccountStatus status) { this.status = status; }
	public LocalDate getOpenDate() { return openDate; }
	public void setOpenDate(LocalDate openDate) { this.openDate = openDate; }
}
