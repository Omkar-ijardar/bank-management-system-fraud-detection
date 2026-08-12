package com.bank.transactions.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.transactions.dto.TransactionConfirmRequestDto;
import com.bank.transactions.dto.TransactionResponseDto;
import com.bank.transactions.dto.TransferRequestDto;
import com.bank.transactions.enums.TransactionStatus;
import com.bank.transactions.service.TransactionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/transfer")
    public ResponseEntity<TransactionResponseDto> transfer(@Valid @RequestBody TransferRequestDto request) {
        TransactionResponseDto response = transactionService.transfer(request);

        HttpStatus httpStatus = (response.getStatus() == TransactionStatus.SUCCESS)
                ? HttpStatus.OK
                : HttpStatus.ACCEPTED;

        return ResponseEntity.status(httpStatus).body(response);
    }

    @PostMapping("/transfer/confirm")
    public ResponseEntity<TransactionResponseDto> confirmTransfer(@RequestBody TransactionConfirmRequestDto request) {
        TransactionResponseDto response = transactionService.confirmTransfer(request);

        HttpStatus httpStatus = (response.getStatus() == TransactionStatus.SUCCESS)
                ? HttpStatus.OK
                : HttpStatus.OK;

        return ResponseEntity.status(httpStatus).body(response);
    }
}
