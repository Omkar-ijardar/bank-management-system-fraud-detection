package com.bank.transactions.service;

import com.bank.transactions.dto.TransactionConfirmRequestDto;
import com.bank.transactions.dto.TransactionResponseDto;
import com.bank.transactions.dto.TransferRequestDto;

public interface TransactionService {

    TransactionResponseDto transfer(TransferRequestDto request);

    TransactionResponseDto confirmTransfer(TransactionConfirmRequestDto request);
}
