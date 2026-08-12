package com.bank.admin.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;



public class ForgotPasswordRequest {

    @Email
    @NotBlank
    private String email;

    
    
	public ForgotPasswordRequest() {
		super();
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
    
    

}