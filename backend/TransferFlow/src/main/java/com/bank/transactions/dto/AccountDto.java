package com.bank.transactions.dto;

import java.math.BigDecimal;

/**
 * Represents account data as returned by the Account Service.
 * This is the Transaction Service's own view of an account — deliberately
 * decoupled from the Account Service's internal AccountResponse class so the
 * two services can evolve independently.
 */
public class AccountDto {

    private Integer accountId;
    private Integer customerId;
    private String accountNumber;
    private String accountType;
    private BigDecimal balance;
    private String status;

    public AccountDto() {
    }

    public AccountDto(Integer accountId, Integer customerId, String accountNumber, String accountType,
                       BigDecimal balance, String status) {
        this.accountId = accountId;
        this.customerId = customerId;
        this.accountNumber = accountNumber;
        this.accountType = accountType;
        this.balance = balance;
        this.status = status;
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    /** True when the account's status string equals ACTIVE, case-insensitively. */
    public boolean isActive() {
        return status != null && status.equalsIgnoreCase("ACTIVE");
    }
}
