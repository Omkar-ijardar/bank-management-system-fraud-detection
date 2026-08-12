package com.bank.admin.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import com.bank.admin.config.FeignConfig;

@FeignClient(
        name = "AUTH-SERVICE",
        url = "${auth.service.url:http://bank-auth-service:9090}",
        configuration = FeignConfig.class
)
public interface AuthServiceClient {
	@GetMapping("/api/auth/internal/dashboard/total-customers")
	Long getTotalCustomers();

	@GetMapping("/api/auth/internal/dashboard/active-customers")
	Long getActiveCustomers();

}