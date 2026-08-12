package com.bank.transactions.fraud;

import com.bank.transactions.dto.FraudCheckRequestDto;
import com.bank.transactions.dto.FraudDecisionRecordDto;
import com.bank.transactions.dto.FraudResponseDto;

public interface FraudCheckService {

    FraudResponseDto checkTransaction(FraudCheckRequestDto request);

    void recordDecision(FraudDecisionRecordDto recordDto);

}