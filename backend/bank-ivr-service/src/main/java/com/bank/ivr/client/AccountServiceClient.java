package com.bank.ivr.client;

import java.time.Duration;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class AccountServiceClient {
	
	private final WebClient webClient;
	
	public AccountServiceClient(@Value("${account.service.base-url:http://localhost:8082}") String baseUrl) {
		this.webClient = WebClient.builder().baseUrl(baseUrl).build();
	}
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getAccountByCustomer(Integer customerId) {
		Map<String, Object> response = webClient.get()
				.uri("/api/accounts/customer/{customerId}", customerId)
				.retrieve()
				.bodyToMono(Map.class)
				.timeout(Duration.ofSeconds(5))
				.block();
		return response != null ? (List<Map<String, Object>>) response.get("data") : List.of(); 
	}

	@SuppressWarnings("unchecked")
	public Map<String, Object> getAccountById(Integer accountId) {
		Map<String, Object> response = webClient.get()
				.uri("/api/accounts/{accountId}", accountId)
				.retrieve()
				.bodyToMono(Map.class)
				.timeout(Duration.ofSeconds(5))
				.block();
		return response != null ? (Map<String, Object>) response.get("data") : Map.of();
	}
}