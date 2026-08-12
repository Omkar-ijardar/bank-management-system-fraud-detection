package com.bank.transactions.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

/**
 * Incoming payload for POST /api/transactions/transfer.
 * The same instance is also forwarded, as-is, to the Account Service by
 * AccountClient.transfer(...) once the fraud check has allowed the transfer.
 */
public class TransferRequestDto {

    @NotNull(message = "fromAccountId is required")
    private Integer fromAccountId;

    @NotNull(message = "toAccountId is required")
    private Integer toAccountId;

    @NotNull(message = "amount is required")
    @DecimalMin(value = "0.01", message = "amount must be greater than zero")
    private BigDecimal amount;
    
    private String transactionCity;
    private String clientIpAddress;

    public TransferRequestDto() {
    }

    public TransferRequestDto(Integer fromAccountId, Integer toAccountId, BigDecimal amount, String transactionCity) {
        this.fromAccountId = fromAccountId;
        this.toAccountId = toAccountId;
        this.amount = amount;
        this.transactionCity = transactionCity;
    }

    public String getClientIpAddress() {
        return clientIpAddress;
    }

    public void setClientIpAddress(String clientIpAddress) {
        this.clientIpAddress = clientIpAddress;
    }

    public String getTransactionCity() {
		return transactionCity;
	}

	public void setTransactionCity(String transactionCity) {
		this.transactionCity = transactionCity;
	}

	public Integer getFromAccountId() {
        return fromAccountId;
    }

    public void setFromAccountId(Integer fromAccountId) {
        this.fromAccountId = fromAccountId;
    }

    public Integer getToAccountId() {
        return toAccountId;
    }

    public void setToAccountId(Integer toAccountId) {
        this.toAccountId = toAccountId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}
