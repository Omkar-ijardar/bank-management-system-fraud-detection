package com.bank.transaction.dto.request;

import java.math.BigDecimal;

public class UpdateBalanceRequest {

    private BigDecimal balance;

    public UpdateBalanceRequest() {
    }

    public UpdateBalanceRequest(BigDecimal balance) {
        this.balance = balance;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }
}