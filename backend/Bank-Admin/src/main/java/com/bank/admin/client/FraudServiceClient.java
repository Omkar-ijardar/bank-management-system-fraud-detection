package com.bank.admin.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import com.bank.admin.config.FeignConfig;

@FeignClient(
        name = "FRAUD-SERVICE",
        url = "${fraud.service.url:http://fraud-detection-service:5000}",
        configuration = FeignConfig.class
)
public interface FraudServiceClient {

	@GetMapping("/api/fraud/internal/dashboard/total")
	Long getTotalFraudCases();

	@GetMapping("/api/fraud/internal/dashboard/pending")
	Long getPendingFraudCases();
}