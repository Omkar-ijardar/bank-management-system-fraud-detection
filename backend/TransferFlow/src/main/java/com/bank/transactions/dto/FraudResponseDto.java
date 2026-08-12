package com.bank.transactions.dto;

public class FraudResponseDto {

    private boolean isFraud;
    private int riskScore;
    private String message;
    private String aiExplanation;

    public FraudResponseDto() {
    }

    public FraudResponseDto(boolean isFraud, int riskScore, String message) {
        this.isFraud = isFraud;
        this.riskScore = riskScore;
        this.message = message;
    }

    public boolean isFraud() {
        return isFraud;
    }

    public void setFraud(boolean fraud) {
        isFraud = fraud;
    }

    public int getRiskScore() {
        return riskScore;
    }

    public void setRiskScore(int riskScore) {
        this.riskScore = riskScore;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getAiExplanation() {
        return aiExplanation;
    }

    public void setAiExplanation(String aiExplanation) {
        this.aiExplanation = aiExplanation;
    }
}