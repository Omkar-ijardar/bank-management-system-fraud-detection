package com.bank.auth.dto;

import jakarta.validation.constraints.NotBlank;

public class VerifyOTPRequest {
	
	@NotBlank
	private String mobile;
	
	@NotBlank
	private String otp;
	
	public VerifyOTPRequest() {
		
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}
	
	

}
