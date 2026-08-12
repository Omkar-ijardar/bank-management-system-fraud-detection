package com.bank.account.dto.response;

import java.math.BigDecimal;

public class TransferResponse {

	private Integer fromAccountId;
	private Integer toAccountId;
	private BigDecimal fromAccountBalance;
	private BigDecimal toAccountBalance;
	private String status;

	public TransferResponse() {}

	public TransferResponse(Integer fromAccountId, Integer toAccountId, BigDecimal fromAccountBalance,
			BigDecimal toAccountBalance, String status) {
		this.fromAccountId = fromAccountId;
		this.toAccountId = toAccountId;
		this.fromAccountBalance = fromAccountBalance;
		this.toAccountBalance = toAccountBalance;
		this.status = status;
	}

	public Integer getFromAccountId() { return fromAccountId; }
	public void setFromAccountId(Integer fromAccountId) { this.fromAccountId = fromAccountId; }
	public Integer getToAccountId() { return toAccountId; }
	public void setToAccountId(Integer toAccountId) { this.toAccountId = toAccountId; }
	public BigDecimal getFromAccountBalance() { return fromAccountBalance; }
	public void setFromAccountBalance(BigDecimal fromAccountBalance) { this.fromAccountBalance = fromAccountBalance; }
	public BigDecimal getToAccountBalance() { return toAccountBalance; }
	public void setToAccountBalance(BigDecimal toAccountBalance) { this.toAccountBalance = toAccountBalance; }
	public String getStatus() { return status; }
	public void setStatus(String status) { this.status = status; }

	public static TransferResponseBuilder builder() {
		return new TransferResponseBuilder();
	}

	public static class TransferResponseBuilder {
		private Integer fromAccountId;
		private Integer toAccountId;
		private BigDecimal fromAccountBalance;
		private BigDecimal toAccountBalance;
		private String status;

		public TransferResponseBuilder fromAccountId(Integer fromAccountId) {
			this.fromAccountId = fromAccountId;
			return this;
		}
		public TransferResponseBuilder toAccountId(Integer toAccountId) {
			this.toAccountId = toAccountId;
			return this;
		}
		public TransferResponseBuilder fromAccountBalance(BigDecimal fromAccountBalance) {
			this.fromAccountBalance = fromAccountBalance;
			return this;
		}
		public TransferResponseBuilder toAccountBalance(BigDecimal toAccountBalance) {
			this.toAccountBalance = toAccountBalance;
			return this;
		}
		public TransferResponseBuilder status(String status) {
			this.status = status;
			return this;
		}
		public TransferResponse build() {
			return new TransferResponse(fromAccountId, toAccountId, fromAccountBalance, toAccountBalance, status);
		}
	}
}
