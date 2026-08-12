package com.bank.auth.dto;

public class VerifyOtpResponse {
	
	private String message;
	
	public VerifyOtpResponse() {
		
	}
	
	public VerifyOtpResponse(String message) {
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	

}
