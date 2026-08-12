package com.bank.admin.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import com.bank.admin.config.FeignConfig;

@FeignClient(
        name = "ACCOUNT-SERVICE",
        url = "${account.service.url:http://bank-account-service:8082}",
        configuration = FeignConfig.class
)
public interface AccountServiceClient {

	@GetMapping("/api/accounts/internal/dashboard/total-accounts")
	Long getTotalAccounts();

	@GetMapping("/api/accounts/internal/dashboard/active-accounts")
	Long getActiveAccounts();
}