package com.bank.transaction.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer transactionId;

    @Column
    private Integer accountId;

    //private Integer relatedAccountId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "VARCHAR(50)")
    private TransactionType transactionType;

    @Column(nullable = false, precision = 18, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false, precision = 18, scale = 2)
    private BigDecimal availableBalance;

    @Column(length = 255)
    private String description;

    @Column(nullable = false)
    private LocalDateTime transactionTime;

    @Column(nullable = false, length = 100)
    private String transactionCity;

    @Column(nullable = false, length = 30, unique = true)
    private String referenceNumber;

    //private Integer riskScore = 0;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "VARCHAR(50)")
    private TransactionStatus status = TransactionStatus.Success;

    // Default Constructor
    public Transaction() {
    }

    // Parameterized Constructor
    public Transaction(Integer transactionId, Integer accountId,
                       TransactionType transactionType, BigDecimal amount,
                       BigDecimal availableBalance, String description,
                       LocalDateTime transactionTime, String transactionCity,
                       String referenceNumber,
                       TransactionStatus status) {

        this.transactionId = transactionId;
        this.accountId = accountId;
        this.transactionType = transactionType;
        this.amount = amount;
        this.availableBalance = availableBalance;
        this.description = description;
        this.transactionTime = transactionTime;
        this.transactionCity = transactionCity;
        this.referenceNumber = referenceNumber;
        this.status = status;
    }

    @PrePersist
    public void prePersist() {
        if (transactionTime == null) {
            transactionTime = LocalDateTime.now();
        }

        if (status == null) {
            status = TransactionStatus.Success;
        }
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

    public TransactionStatus getStatus() {
        return status;
    }

    public void setStatus(TransactionStatus status) {
        this.status = status;
    }
}