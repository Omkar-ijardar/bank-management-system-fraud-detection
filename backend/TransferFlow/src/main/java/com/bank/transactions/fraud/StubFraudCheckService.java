package com.bank.transactions.fraud;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.bank.transactions.dto.FraudCheckRequestDto;
import com.bank.transactions.dto.FraudDecisionRecordDto;
import com.bank.transactions.dto.FraudResponseDto;

@Service
public class StubFraudCheckService implements FraudCheckService {

    @Value("${fraud.api.url:http://localhost:5000/api/Fraud/check}")
    private String fraudApiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public FraudResponseDto checkTransaction(FraudCheckRequestDto request) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<FraudCheckRequestDto> entity = new HttpEntity<>(request, headers);

            FraudResponseDto response = restTemplate.postForObject(
                    fraudApiUrl,
                    entity,
                    FraudResponseDto.class
            );

            return response != null ? response : new FraudResponseDto(false, 0, "Transaction Safe");
        } catch (Exception ex) {
            System.err.println("Fraud Service check failed: " + ex.getMessage());
            boolean isHighAmount = request.getTransactionAmount() != null && request.getTransactionAmount().doubleValue() >= 50000;
            return new FraudResponseDto(
                    isHighAmount,
                    isHighAmount ? 85 : 10,
                    isHighAmount ? "High risk amount threshold exceeded" : "Fraud service offline - standard check passed"
            );
        }
    }

    @Override
    public void recordDecision(FraudDecisionRecordDto recordDto) {
        try {
            String recordUrl = fraudApiUrl.replace("/check", "/record-decision");
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<FraudDecisionRecordDto> entity = new HttpEntity<>(recordDto, headers);
            restTemplate.postForObject(recordUrl, entity, String.class);
        } catch (Exception ex) {
            System.err.println("Failed to record fraud decision to .NET Fraud Service: " + ex.getMessage());
        }
    }
}