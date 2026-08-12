package com.bank.transaction.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class TransactionResponse {

    private Integer transactionId;

    private Integer accountId;

    private String referenceNumber;

    private String transactionType;

    private BigDecimal amount;

    private BigDecimal availableBalance;

    private String transactionCity;

    private String status;

    private LocalDateTime transactionTime;

    private String message;

    // Default Constructor
    public TransactionResponse() {
    }

    // Parameterized Constructor
    public TransactionResponse(Integer transactionId, Integer accountId, String referenceNumber,
            String transactionType, BigDecimal amount,
            BigDecimal availableBalance, String transactionCity, String status,
            LocalDateTime transactionTime, String message) {

        this.transactionId = transactionId;
        this.accountId = accountId;
        this.referenceNumber = referenceNumber;
        this.transactionType = transactionType;
        this.amount = amount;
        this.availableBalance = availableBalance;
        this.transactionCity = transactionCity;
        this.status = status;
        this.transactionTime = transactionTime;
        this.message = message;
    }

    public Integer getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Integer transactionId) {
        this.transactionId = transactionId;
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public String getReferenceNumber() {
        return referenceNumber;
    }

    public void setReferenceNumber(String referenceNumber) {
        this.referenceNumber = referenceNumber;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public BigDecimal getAvailableBalance() {
        return availableBalance;
    }

    public void setAvailableBalance(BigDecimal availableBalance) {
        this.availableBalance = availableBalance;
    }

    public String getTransactionCity() {
        return transactionCity;
    }

    public void setTransactionCity(String transactionCity) {
        this.transactionCity = transactionCity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getTransactionTime() {
        return transactionTime;
    }

    public void setTransactionTime(LocalDateTime transactionTime) {
        this.transactionTime = transactionTime;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}