package com.bank.transaction.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.bank.transaction.dto.request.UpdateBalanceRequest;
import com.bank.transaction.dto.response.AccountResponse;
import com.bank.transaction.dto.response.ApiResponse;
import com.bank.transaction.exception.ResourceNotFoundException;
import com.bank.transaction.exception.InvalidOperationException;

@Component
public class AccountServiceClient {

    private final WebClient webClient;

    public AccountServiceClient(
            WebClient.Builder webClientBuilder,
            @Value("${account.service.url}") String accountServiceUrl) {

        this.webClient = webClientBuilder
                .baseUrl(accountServiceUrl)
                .build();
    }

    public AccountResponse getAccountById(Integer accountId) {
        String authHeader = getAuthorizationHeader();

        try {
            ApiResponse<AccountResponse> response = webClient.get()
                    .uri("/api/accounts/{id}", accountId)
                    .headers(headers -> {
                        if (authHeader != null) headers.set("Authorization", authHeader);
                    })
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<ApiResponse<AccountResponse>>() {})
                    .block();

            if (response == null || response.getData() == null) {
                return null;
            }

            return response.getData();
        } catch (WebClientResponseException.NotFound ex) {
            throw new ResourceNotFoundException("Account not found with id: " + accountId);
        } catch (Exception ex) {
            throw new InvalidOperationException("Account service error: " + ex.getMessage());
        }
    }

    public void updateBalance(Integer accountId, UpdateBalanceRequest request) {
        String authHeader = getAuthorizationHeader();

        try {
            webClient.put()
                    .uri("/api/accounts/{id}/balance", accountId)
                    .headers(headers -> {
                        if (authHeader != null) headers.set("Authorization", authHeader);
                    })
                    .contentType(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(Void.class)
                    .block();
        } catch (WebClientResponseException.NotFound ex) {
            throw new ResourceNotFoundException("Account not found with id: " + accountId);
        } catch (Exception ex) {
            throw new InvalidOperationException("Failed to update balance: " + ex.getMessage());
        }
    }

    private String getAuthorizationHeader() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getPrincipal() == null) {
            return null;
        }

        String principal = authentication.getPrincipal().toString();
        if (principal.startsWith("Bearer ")) {
            return principal;
        }
        return "Bearer " + principal;
    }
}