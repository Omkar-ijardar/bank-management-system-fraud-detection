package com.bank.transactions.dto;

import java.math.BigDecimal;

public class FraudCheckRequestDto {

    private Integer customerId;
    private Integer accountId;
    private BigDecimal transactionAmount;
    private String transactionType;
    private String clientIpAddress;
    private String currentTransactionCity;

    public FraudCheckRequestDto() {
    }

    

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public BigDecimal getTransactionAmount() {
        return transactionAmount;
    }

    public void setTransactionAmount(BigDecimal transactionAmount) {
        this.transactionAmount = transactionAmount;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public String getClientIpAddress() {
        return clientIpAddress;
    }

    public void setClientIpAddress(String clientIpAddress) {
        this.clientIpAddress = clientIpAddress;
    }

    public String getCurrentTransactionCity() {
        return currentTransactionCity;
    }

    public void setCurrentTransactionCity(String currentTransactionCity) {
        this.currentTransactionCity = currentTransactionCity;
    }
}