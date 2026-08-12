package com.bank.transactions.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * General-purpose exception for transaction-processing failures that are not
 * covered by the more specific exceptions (AccountNotFoundException,
 * InsufficientBalanceException, FraudDetectionException). Examples: the
 * sender and receiver account are the same, an account is not ACTIVE, or the
 * Account Service reports a failed transfer. Maps to HTTP 400.
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class TransactionException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public TransactionException(String message) {
        super(message);
    }

    public TransactionException(String message, Throwable cause) {
        super(message, cause);
    }
}
