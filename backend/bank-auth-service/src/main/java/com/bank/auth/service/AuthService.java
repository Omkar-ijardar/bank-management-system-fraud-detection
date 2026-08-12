package com.bank.auth.service;

import com.bank.auth.dto.ForgotPasswordRequest;
import com.bank.auth.dto.ForgotPasswordResponse;
import com.bank.auth.dto.LoginRequest;
import com.bank.auth.dto.LoginResponse;
import com.bank.auth.dto.LogoutResponse;
import com.bank.auth.dto.RegisterRequest;
import com.bank.auth.dto.RegisterResponse;
import com.bank.auth.dto.ResetPasswordRequest;
import com.bank.auth.dto.ResetPasswordResponse;
import com.bank.auth.dto.VerifyOTPRequest;
import com.bank.auth.dto.VerifyOtpResponse;

public interface AuthService {
	
	RegisterResponse register(RegisterRequest request);
	
	VerifyOtpResponse verifyOtp(VerifyOTPRequest request);

	LoginResponse login(LoginRequest request);
	
	ForgotPasswordResponse forgotPassword(ForgotPasswordRequest request);

	ResetPasswordResponse resetPassword(ResetPasswordRequest request);
	
	LogoutResponse logout();

	boolean customerExists(Integer id);

	com.bank.auth.entity.Customer getCustomerById(Integer id);

	java.util.List<com.bank.auth.entity.Customer> getAllCustomers();

	Long getTotalCustomers();

	Long getActiveCustomers();
}
