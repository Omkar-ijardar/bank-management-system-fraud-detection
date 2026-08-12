package com.bank.transaction.exception;

public class InvalidOperationException extends RuntimeException {
	
	public InvalidOperationException(String message) {
		super(message);
	}
}
