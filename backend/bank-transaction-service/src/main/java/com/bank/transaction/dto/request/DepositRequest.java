package com.bank.transaction.dto.request;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class DepositRequest {
	
	@NotNull
	private Integer accountId;
	
	@NotNull
	@DecimalMin(value = "0.01")
	private BigDecimal amount;
	
	private String description;
	
	@NotBlank
	private String transactionCity;

	public Integer getAccountId() {
		return accountId;
	}

	public void setAccountId(Integer accountId) {
		this.accountId = accountId;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTransactionCity() {
		return transactionCity;
	}

	public void setTransactionCity(String transactionCity) {
		this.transactionCity = transactionCity;
	}

	
}
