package com.bank.ivr.client;

import java.time.Duration;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class TransactionServiceClient {

    private final WebClient webClient;

    public TransactionServiceClient(@Value("${transaction.service.base-url:http://localhost:8083}") String baseUrl) {
        this.webClient = WebClient.builder().baseUrl(baseUrl).build();
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> getTransactionHistory(Integer accountId) {
        try {
            Map<String, Object> response = webClient.get()
                    .uri("/api/transactions/account/{accountId}", accountId)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .timeout(Duration.ofSeconds(5))
                    .block();
            return response != null ? (List<Map<String, Object>>) response.get("data") : List.of();
        } catch (Exception e) {
            return List.of();
        }
    }
}