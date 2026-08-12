package com.bank.account.client;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@Component
public class AuthServiceClient {
	
	private final WebClient webClient;
	
	public AuthServiceClient(@Value("${auth.service.base-url}") String baseUrl) {
		this.webClient = WebClient.builder().baseUrl(baseUrl).build();
	}
	
	public boolean customerExists(Integer customerId) {
		try{
			CustomerCheckResponse response = webClient.get()
				.uri("/api/auth/customers/{id}",customerId)
				.retrieve()
				.bodyToMono(CustomerCheckResponse.class)
				.timeout(Duration.ofSeconds(3))
				.block();
		return response != null && response.isExists();
		} catch (WebClientResponseException.NotFound ex) {
			return false;
		}
	}
	
	public record CustomerCheckResponse(Integer customerId, boolean exists, String status) {
		public boolean isExists() {return exists; }
	}

}
