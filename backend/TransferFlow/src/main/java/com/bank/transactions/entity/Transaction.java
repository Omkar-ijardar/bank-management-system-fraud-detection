package com.bank.transactions.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.bank.transactions.enums.TransactionStatus;
import com.bank.transactions.enums.TransactionType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * JPA entity representing a completed or attempted transaction record.
 * Owned exclusively by the Transaction Service — the Account table itself
 * belongs to, and is only ever modified by, the Account Service.
 */
@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transactionId")
    private Integer transactionId;

    @Column(name = "accountId", nullable = false)
    private Integer accountId;

    @Enumerated(EnumType.STRING)
    @Column(name = "transactionType", nullable = false, columnDefinition = "VARCHAR(50)")
    private TransactionType transactionType;

    @Column(name = "amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @Column(name = "availableBalance", precision = 15, scale = 2)
    private BigDecimal availableBalance;

    @Column(name = "description", length = 255)
    private String description;

    @Column(name = "transactionTime", nullable = false)
    private LocalDateTime transactionTime;

    @Column(name = "transactionCity", length = 100)
    private String transactionCity;

    @Column(name = "referenceNumber", nullable = false, unique = true, length = 40)
    private String referenceNumber;

//    @Column(name = "riskScore")
//    private Integer riskScore;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, columnDefinition = "VARCHAR(50)")
    private TransactionStatus status;

    public Transaction() {
        // required by JPA
    }

    public Transaction(Integer accountId, TransactionType transactionType, BigDecimal amount,
                        BigDecimal availableBalance, String description, LocalDateTime transactionTime,
                        String transactionCity, String referenceNumber,
                        TransactionStatus status) {
        this.accountId = accountId;
        this.transactionType = transactionType;
        this.amount = amount;
        this.availableBalance = availableBalance;
        this.description = description;
        this.transactionTime = transactionTime;
        this.transactionCity = transactionCity;
        this.referenceNumber = referenceNumber;
//        this.riskScore = riskScore;
        this.status = status;
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

    public TransactionType getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(TransactionType transactionType) {
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getTransactionTime() {
        return transactionTime;
    }

    public void setTransactionTime(LocalDateTime transactionTime) {
        this.transactionTime = transactionTime;
    }

    public String getTransactionCity() {
        return transactionCity;
    }

    public void setTransactionCity(String transactionCity) {
        this.transactionCity = transactionCity;
    }

    public String getReferenceNumber() {
        return referenceNumber;
    }

    public void setReferenceNumber(String referenceNumber) {
        this.referenceNumber = referenceNumber;
    }

//    public Integer getRiskScore() {
//        return riskScore;
//    }
//
//    public void setRiskScore(Integer riskScore) {
//        this.riskScore = riskScore;
//    }

    public TransactionStatus getStatus() {
        return status;
    }

    public void setStatus(TransactionStatus status) {
        this.status = status;
    }
}
