package com.bank.account.dto.request;

import java.math.BigDecimal;

public class TransferRequest {

	private Integer fromAccountId;
    private Integer toAccountId;
    private BigDecimal amount;

    public TransferRequest() {}

    public TransferRequest(Integer fromAccountId, Integer toAccountId, BigDecimal amount) {
        this.fromAccountId = fromAccountId;
        this.toAccountId = toAccountId;
        this.amount = amount;
    }

    public Integer getFromAccountId() { return fromAccountId; }
    public void setFromAccountId(Integer fromAccountId) { this.fromAccountId = fromAccountId; }
    public Integer getToAccountId() { return toAccountId; }
    public void setToAccountId(Integer toAccountId) { this.toAccountId = toAccountId; }
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
}
