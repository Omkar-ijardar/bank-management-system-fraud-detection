package com.bank.transactions.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Thrown when the Account Service reports that an account (sender or receiver)
 * does not exist for the given account id. Maps to HTTP 404.
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class AccountNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public AccountNotFoundException(String message) {
        super(message);
    }

    public AccountNotFoundException(Integer accountId) {
        super("Account not found with id: " + accountId);
    }
}
