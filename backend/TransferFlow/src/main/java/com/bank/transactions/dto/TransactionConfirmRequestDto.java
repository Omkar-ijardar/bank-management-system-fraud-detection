package com.bank.transactions.dto;

import java.math.BigDecimal;

public class TransactionConfirmRequestDto {
    private Integer fromAccountId;
    private Integer toAccountId;
    private BigDecimal amount;
    private String transactionCity;
    private String clientIpAddress;
    private String customerDecision;
    private Integer riskScore;
    private String aiExplanation;

    public TransactionConfirmRequestDto() {}

    public Integer getFromAccountId() { return fromAccountId; }
    public void setFromAccountId(Integer fromAccountId) { this.fromAccountId = fromAccountId; }

    public Integer getToAccountId() { return toAccountId; }
    public void setToAccountId(Integer toAccountId) { this.toAccountId = toAccountId; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getTransactionCity() { return transactionCity; }
    public void setTransactionCity(String transactionCity) { this.transactionCity = transactionCity; }

    public String getClientIpAddress() { return clientIpAddress; }
    public void setClientIpAddress(String clientIpAddress) { this.clientIpAddress = clientIpAddress; }

    public String getCustomerDecision() { return customerDecision; }
    public void setCustomerDecision(String customerDecision) { this.customerDecision = customerDecision; }

    public Integer getRiskScore() { return riskScore; }
    public void setRiskScore(Integer riskScore) { this.riskScore = riskScore; }

    public String getAiExplanation() { return aiExplanation; }
    public void setAiExplanation(String aiExplanation) { this.aiExplanation = aiExplanation; }
}
