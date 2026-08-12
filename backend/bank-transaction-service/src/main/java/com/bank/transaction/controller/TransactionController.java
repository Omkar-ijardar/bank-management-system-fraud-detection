package com.bank.transaction.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.bank.transaction.dto.request.DepositRequest;
import com.bank.transaction.dto.request.WithdrawRequest;
import com.bank.transaction.dto.response.ApiResponse;
import com.bank.transaction.dto.response.TransactionResponse;
import com.bank.transaction.service.TransactionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/transactions")
@Validated
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/deposit")
    public ResponseEntity<ApiResponse<TransactionResponse>> deposit(
            @Valid @RequestBody DepositRequest request) {

        TransactionResponse response =
                transactionService.deposit(request);

        return ResponseEntity.ok(
                ApiResponse.success(
                        response,
                        "Amount deposited successfully"));
    }

    @PostMapping("/withdraw")
    public ResponseEntity<ApiResponse<TransactionResponse>> withdraw(
            @Valid @RequestBody WithdrawRequest request) {

        TransactionResponse response =
                transactionService.withdraw(request);

        return ResponseEntity.ok(
                ApiResponse.success(
                        response,
                        "Amount withdrawn successfully"));
    }

    @GetMapping("/{transactionId}")
    public ResponseEntity<ApiResponse<TransactionResponse>>
    getTransactionById(
            @PathVariable Integer transactionId) {

        TransactionResponse response =
                transactionService.getTransactionById(transactionId);

        return ResponseEntity.ok(
                ApiResponse.success(
                        response,
                        "Transaction fetched successfully"));
    }

    @GetMapping("/account/{accountId}")
    public ResponseEntity<ApiResponse<List<TransactionResponse>>>
    getTransactionHistory(
            @PathVariable Integer accountId) {

        List<TransactionResponse> response =
                transactionService.getTransactionHistory(accountId);

        return ResponseEntity.ok(
                ApiResponse.success(
                        response,
                        "Transaction history fetched successfully"));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<TransactionResponse>>> getAllTransactions() {
        return ResponseEntity.ok(
                ApiResponse.success(
                        transactionService.getAllTransactions(),
                        "All transactions fetched successfully"));
    }

    @GetMapping("/internal/dashboard/total")
    public ResponseEntity<Long> getTotalTransactions() {
        return ResponseEntity.ok(transactionService.getTotalTransactions());
    }

    @GetMapping("/internal/dashboard/successful")
    public ResponseEntity<Long> getSuccessfulTransactions() {
        return ResponseEntity.ok(transactionService.getSuccessfulTransactions());
    }

    @GetMapping("/internal/dashboard/failed")
    public ResponseEntity<Long> getFailedTransactions() {
        return ResponseEntity.ok(transactionService.getFailedTransactions());
    }

    @GetMapping("/internal/dashboard/amount")
    public ResponseEntity<java.math.BigDecimal> getTotalTransactionAmount() {
        return ResponseEntity.ok(transactionService.getTotalTransactionAmount());
    }
}