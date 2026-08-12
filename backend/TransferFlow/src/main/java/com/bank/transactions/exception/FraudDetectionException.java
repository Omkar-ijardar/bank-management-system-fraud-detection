package com.bank.transactions.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Thrown when the Fraud Check Service cannot be reached or returns an
 * unexpected/invalid result. Note: a transaction being FLAGGED as suspicious
 * is a normal business outcome and is NOT represented by this exception —
 * this is reserved for genuine failures of the fraud-check call itself.
 * Maps to HTTP 502 (upstream dependency failure).
 */
@ResponseStatus(HttpStatus.BAD_GATEWAY)
public class FraudDetectionException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public FraudDetectionException(String message) {
        super(message);
    }

    public FraudDetectionException(String message, Throwable cause) {
        super(message, cause);
    }
}
