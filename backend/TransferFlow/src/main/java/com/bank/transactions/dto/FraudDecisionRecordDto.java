package com.bank.transactions.dto;

import java.math.BigDecimal;

public class FraudDecisionRecordDto {
    private Long customerId;
    private Long accountId;
    private BigDecimal transactionAmount;
    private String transactionType = "TRANSFER";
    private String clientIpAddress;
    private String currentTransactionCity;
    private Integer riskScore;
    private String aiExplanation;
    private String decision;
    private String reason;

    public FraudDecisionRecordDto() {}

    public FraudDecisionRecordDto(Long customerId, Long accountId, BigDecimal transactionAmount,
                                  String clientIpAddress, String currentTransactionCity,
                                  Integer riskScore, String aiExplanation, String decision, String reason) {
        this.customerId = customerId;
        this.accountId = accountId;
        this.transactionAmount = transactionAmount;
        this.clientIpAddress = clientIpAddress;
        this.currentTransactionCity = currentTransactionCity;
        this.riskScore = riskScore;
        this.aiExplanation = aiExplanation;
        this.decision = decision;
        this.reason = reason;
    }

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public Long getAccountId() { return accountId; }
    public void setAccountId(Long accountId) { this.accountId = accountId; }

    public BigDecimal getTransactionAmount() { return transactionAmount; }
    public void setTransactionAmount(BigDecimal transactionAmount) { this.transactionAmount = transactionAmount; }

    public String getTransactionType() { return transactionType; }
    public void setTransactionType(String transactionType) { this.transactionType = transactionType; }

    public String getClientIpAddress() { return clientIpAddress; }
    public void setClientIpAddress(String clientIpAddress) { this.clientIpAddress = clientIpAddress; }

    public String getCurrentTransactionCity() { return currentTransactionCity; }
    public void setCurrentTransactionCity(String currentTransactionCity) { this.currentTransactionCity = currentTransactionCity; }

    public Integer getRiskScore() { return riskScore; }
    public void setRiskScore(Integer riskScore) { this.riskScore = riskScore; }

    public String getAiExplanation() { return aiExplanation; }
    public void setAiExplanation(String aiExplanation) { this.aiExplanation = aiExplanation; }

    public String getDecision() { return decision; }
    public void setDecision(String decision) { this.decision = decision; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
