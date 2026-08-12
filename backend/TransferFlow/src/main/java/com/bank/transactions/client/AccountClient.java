package com.bank.transactions.client;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import com.bank.transactions.dto.AccountDto;
import com.bank.transactions.dto.TransferRequestDto;
import com.bank.transactions.exception.AccountNotFoundException;
import com.bank.transactions.exception.TransactionException;

/**
 * The ONLY point of contact between the Transaction Service and account data.
 * All account lookups and balance transfers go through the Account Service's
 * REST API via WebClient — this service never accesses an Account table or
 * AccountRepository directly, per the project's design rules.
 */
@Component
public class AccountClient {

    private final WebClient webClient;

    public AccountClient(WebClient.Builder webClientBuilder,
                          @Value("${account.service.url}") String accountServiceBaseUrl) {
        this.webClient = webClientBuilder.baseUrl(accountServiceBaseUrl).build();
    }

    /**
     * Fetches a single account by id from the Account Service.
     *
     * @throws AccountNotFoundException if the Account Service returns 404
     * @throws TransactionException     if the Account Service is unreachable or returns an error
     */
    public AccountDto getAccountById(Integer accountId) {
        try {
            AccountApiResponse<AccountDto> response = webClient.get()
                    .uri("/api/accounts/{accountId}", accountId)
                    .retrieve()
                    .bodyToMono(new org.springframework.core.ParameterizedTypeReference<AccountApiResponse<AccountDto>>() {})
                    .timeout(Duration.ofSeconds(5))
                    .block();

            if (response == null || response.getData() == null) {
                throw new AccountNotFoundException(accountId);
            }
            return response.getData();

        } catch (WebClientResponseException.NotFound ex) {
            throw new AccountNotFoundException(accountId);
        } catch (WebClientResponseException ex) {
            throw new TransactionException(
                    "Account Service returned an error while fetching account " + accountId + ": " + ex.getMessage(), ex);
        }
    }

    /**
     * Instructs the Account Service to perform the actual balance transfer
     * between the sender and receiver accounts. The Account Service owns the
     * Account table and is solely responsible for updating balances.
     *
     * @throws TransactionException if the Account Service is unreachable, rejects the
     *                               transfer, or returns an error
     */
    public TransferResult transfer(TransferRequestDto request) {
        try {
            AccountApiResponse<TransferResult> response = webClient.post()
                    .uri("/api/accounts/transfer")
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(new org.springframework.core.ParameterizedTypeReference<AccountApiResponse<TransferResult>>() {})
                    .timeout(Duration.ofSeconds(5))
                    .block();

            if (response == null || !response.isSuccess() || response.getData() == null) {
                String message = (response != null) ? response.getMessage() : "No response from Account Service";
                throw new TransactionException("Transfer rejected by Account Service: " + message);
            }
            return response.getData();

        } catch (WebClientResponseException ex) {
            throw new TransactionException(
                    "Account Service returned an error while executing transfer: " + ex.getMessage(), ex);
        }
    }

    /**
     * Generic envelope matching the Account Service's ApiResponse<T> wire format:
     * { "success": boolean, "data": T, "message": String }
     * Kept private to this client so the Transaction Service never depends on
     * the Account Service's own DTO classes.
     */
    public static class AccountApiResponse<T> {
        private boolean success;
        private T data;
        private String message;

        public boolean isSuccess() {
            return success;
        }

        public void setSuccess(boolean success) {
            this.success = success;
        }

        public T getData() {
            return data;
        }

        public void setData(T data) {
            this.data = data;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    /**
     * Result of a successful transfer as reported by the Account Service —
     * carries the sender's updated balance so it can be recorded on the
     * Transaction entity's availableBalance field.
     */
    public static class TransferResult {
        private Integer fromAccountId;
        private Integer toAccountId;
        private java.math.BigDecimal fromAccountBalance;
        private java.math.BigDecimal toAccountBalance;
        private String status;

        public Integer getFromAccountId() {
            return fromAccountId;
        }

        public void setFromAccountId(Integer fromAccountId) {
            this.fromAccountId = fromAccountId;
        }

        public Integer getToAccountId() {
            return toAccountId;
        }

        public void setToAccountId(Integer toAccountId) {
            this.toAccountId = toAccountId;
        }

        public java.math.BigDecimal getFromAccountBalance() {
            return fromAccountBalance;
        }

        public void setFromAccountBalance(java.math.BigDecimal fromAccountBalance) {
            this.fromAccountBalance = fromAccountBalance;
        }

        public java.math.BigDecimal getToAccountBalance() {
            return toAccountBalance;
        }

        public void setToAccountBalance(java.math.BigDecimal toAccountBalance) {
            this.toAccountBalance = toAccountBalance;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}
