package com.bank.account.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.account.dto.request.CreateAccountRequest;
import com.bank.account.dto.request.TransferRequest;
import com.bank.account.dto.request.UpdateAccountRequest;
import com.bank.account.dto.request.UpdateBalanceRequest;
import com.bank.account.dto.response.AccountResponse;
import com.bank.account.dto.response.ApiResponse;
import com.bank.account.dto.response.TransferResponse;
import com.bank.account.service.AccountService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

	@Autowired
	private AccountService accountService;
	
	@GetMapping
	public ResponseEntity<ApiResponse<List<AccountResponse>>> getAllAccounts() {
		return ResponseEntity.ok(ApiResponse.success(accountService.getAllAccounts(), "All accounts fetched successfully"));
	}

	@PostMapping
	public ResponseEntity<ApiResponse<AccountResponse>> createAccount(
			@Valid @RequestBody CreateAccountRequest request){
		return ResponseEntity.ok(ApiResponse.success(accountService.createAccount(request), "Account created Successfully"));
	}
	
	@GetMapping("/{accountId}")
	public ResponseEntity<ApiResponse<AccountResponse>>getAccount(@PathVariable Integer accountId){
		 System.out.println("Received GET account request: " + accountId);
		return ResponseEntity.ok(ApiResponse.success(
				accountService.getAccount(accountId), "Account fetched successfully"));
	}
	
	@GetMapping("/customer/{customerId}")
	public ResponseEntity<ApiResponse<List<AccountResponse>>> getAccountByCustomer(
			@PathVariable Integer customerId){
		return ResponseEntity.ok(ApiResponse.success(
				accountService.getAccountByCustomer(customerId), "Accounts fetched successfully"));
				
	}
	
	@PutMapping("/{accountId}")
	public ResponseEntity<ApiResponse<AccountResponse>> updateAccount(
			@PathVariable Integer accountId, @RequestBody UpdateAccountRequest request){
		return ResponseEntity.ok(ApiResponse.success(
				accountService.updateAccount(accountId, request), "Account Updated Successfully"));
	}
	
	@PutMapping("/{accountId}/balance")
	public ResponseEntity<ApiResponse<AccountResponse>> updateBalance(
	        @PathVariable Integer accountId,
	        @RequestBody UpdateBalanceRequest request) {

	    return ResponseEntity.ok(
	            ApiResponse.success(
	                    accountService.updateBalance(accountId, request),
	                    "Balance updated successfully"));
	}
	
	
	@DeleteMapping("/{accountId}")
	public ResponseEntity<ApiResponse<AccountResponse>> closeAccount(@PathVariable Integer accountId){
		return ResponseEntity.ok(ApiResponse.success(
				accountService.closeAccount(accountId), "Account closed successfully"));
	}
	
	@PostMapping("/transfer")
	public ResponseEntity<ApiResponse<TransferResponse>> transfer(
	        @RequestBody TransferRequest request) {

	    return ResponseEntity.ok(
	            ApiResponse.success(
	                    accountService.transfer(request),
	                    "Balance updated successfully"));
	}

	@GetMapping("/internal/dashboard/total-accounts")
	public ResponseEntity<Long> getTotalAccounts() {
	    return ResponseEntity.ok(accountService.getTotalAccounts());
	}

	@GetMapping("/internal/dashboard/active-accounts")
	public ResponseEntity<Long> getActiveAccounts() {
	    return ResponseEntity.ok(accountService.getActiveAccounts());
	}
}
