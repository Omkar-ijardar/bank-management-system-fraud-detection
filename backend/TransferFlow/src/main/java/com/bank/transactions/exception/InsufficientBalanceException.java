package com.bank.transactions.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Thrown when the sender account does not have enough balance
 * to cover the requested transfer amount. Maps to HTTP 400.
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InsufficientBalanceException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public InsufficientBalanceException(String message) {
        super(message);
    }

    public InsufficientBalanceException(Integer accountId, java.math.BigDecimal available, java.math.BigDecimal requested) {
        super("Insufficient balance in account " + accountId
                + ". Available: " + available + ", Requested: " + requested);
    }
}
