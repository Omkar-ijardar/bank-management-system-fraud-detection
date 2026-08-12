package com.bank.ivr.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.bank.ivr.client.AccountServiceClient;
import com.bank.ivr.client.TransactionServiceClient;
import com.bank.ivr.dto.IVRCallRequest;
import com.bank.ivr.dto.IVRResponseDto;
import com.bank.ivr.entity.IVRCallLog;
import com.bank.ivr.repository.IVRCallLogRepository;
import com.bank.ivr.service.IVRService;

import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Gather;
import com.twilio.twiml.voice.Say;
import com.twilio.twiml.voice.Hangup;

@Service
public class IVRServiceImpl implements IVRService {

    private final IVRCallLogRepository callLogRepository;
    private final AccountServiceClient accountServiceClient;
    private final TransactionServiceClient transactionServiceClient;

    public IVRServiceImpl(IVRCallLogRepository callLogRepository,
                          AccountServiceClient accountServiceClient,
                          TransactionServiceClient transactionServiceClient) {
        this.callLogRepository = callLogRepository;
        this.accountServiceClient = accountServiceClient;
        this.transactionServiceClient = transactionServiceClient;
    }

    @Override
    public IVRCallLog logCall(IVRCallRequest request) {
        try {
            if (request == null || request.getCustomerId() == null) {
                return null;
            }
            IVRCallLog log = new IVRCallLog();
            log.setCustomerId(request.getCustomerId());
            log.setServiceType(request.getServiceType());
            log.setCallTime(LocalDateTime.now());
            log.setDuration(request.getDuration() != null ? request.getDuration() : 0);
            return callLogRepository.save(log);
        } catch (Exception e) {
            System.err.println("Warning: Could not save IVR call log (Customer ID FK missing): " + e.getMessage());
            return null; 
        }
    }

    @Override
    public List<IVRCallLog> getCallLogsByCustomer(Integer customerId) {
        return callLogRepository.findByCustomerIdOrderByCallTimeDesc(customerId);
    }

    @Override
    public List<IVRCallLog> getAllCallLogs() {
        return callLogRepository.findAll();
    }

    @Override
    public IVRResponseDto handleWelcomeCall() {
        VoiceResponse.Builder responseBuilder = new VoiceResponse.Builder();

        Gather gather = new Gather.Builder()
                .action("/api/ivr/menu")
                .numDigits(1)
                .timeout(10)
                .inputs(Gather.Input.DTMF)
                .say(new Say.Builder("Welcome to Banking System Voice Service. " +
                        "Press 1 to check your account balance. " +
                        "Press 2 for your recent mini statement. " +
                        "Press 3 to speak with a customer care executive.")
                        .voice(Say.Voice.ALICE)
                        .language(Say.Language.EN_IN)
                        .build())
                .build();

        VoiceResponse twiml = responseBuilder.gather(gather).build();

        return IVRResponseDto.builder()
                .success(true)
                .message("IVR Welcome TwiML generated")
                .twimlXml(twiml.toXml())
                .build();
    }

    @Override
    public IVRResponseDto handleMenuOption(Integer customerId, String digits) {
        VoiceResponse.Builder responseBuilder = new VoiceResponse.Builder();

        if (digits == null) digits = "";

        switch (digits.trim()) {
            case "1":
                return getAccountBalanceResponse(customerId);

            case "2":
                return getMiniStatementResponse(customerId);

            case "3":
                responseBuilder.say(new Say.Builder("Connecting your call to a customer care representative. Please stay on the line.")
                        .voice(Say.Voice.ALICE)
                        .language(Say.Language.EN_IN)
                        .build());
                responseBuilder.hangup(new Hangup.Builder().build());
                
                if (customerId != null) {
                    logCall(new IVRCallRequest(customerId, null, "CUSTOMER_SUPPORT", 30));
                }

                return IVRResponseDto.builder()
                        .success(true)
                        .message("Connected to Customer Support")
                        .twimlXml(responseBuilder.build().toXml())
                        .build();

            default:
                responseBuilder.say(new Say.Builder("Invalid choice entered. Thank you for calling Banking System. Goodbye.")
                        .voice(Say.Voice.ALICE)
                        .language(Say.Language.EN_IN)
                        .build());
                responseBuilder.hangup(new Hangup.Builder().build());

                return IVRResponseDto.builder()
                        .success(false)
                        .message("Invalid IVR Menu Option")
                        .twimlXml(responseBuilder.build().toXml())
                        .build();
        }
    }

    @Override
    public IVRResponseDto getAccountBalanceResponse(Integer customerId) {
        VoiceResponse.Builder responseBuilder = new VoiceResponse.Builder();
        StringBuilder voiceMessage = new StringBuilder();

        try {
            List<Map<String, Object>> accounts = accountServiceClient.getAccountByCustomer(customerId != null ? customerId : 1);
            if (accounts.isEmpty()) {
                voiceMessage.append("No active bank accounts found for your customer ID.");
            } else {
                for (Map<String, Object> acc : accounts) {
                    Object accNum = acc.get("accountNumber");
                    Object balance = acc.get("balance");
                    Object type = acc.get("accountType");
                    voiceMessage.append("Your ")
                            .append(type != null ? type : "Bank")
                            .append(" account ending in ")
                            .append(accNum != null ? accNum.toString().substring(Math.max(0, accNum.toString().length() - 4)) : "0000")
                            .append(" has an available balance of Rupees ")
                            .append(balance != null ? balance.toString() : "0")
                            .append(". ");
                }
            }
        } catch (Exception e) {
            voiceMessage.append("Unable to fetch account balance at this moment. Please try again later.");
        }

        voiceMessage.append(" Thank you for calling Banking System. Have a great day.");

        responseBuilder.say(new Say.Builder(voiceMessage.toString())
                .voice(Say.Voice.ALICE)
                .language(Say.Language.EN_IN)
                .build());
        responseBuilder.hangup(new Hangup.Builder().build());

        logCall(new IVRCallRequest(customerId != null ? customerId : 1, null, "BALANCE_ENQUIRY", 25));

        return IVRResponseDto.builder()
                .success(true)
                .message("Balance Enquiry Response Generated")
                .twimlXml(responseBuilder.build().toXml())
                .build();
    }

    @Override
    public IVRResponseDto getMiniStatementResponse(Integer customerId) {
        VoiceResponse.Builder responseBuilder = new VoiceResponse.Builder();
        StringBuilder voiceMessage = new StringBuilder();

        try {
            List<Map<String, Object>> accounts = accountServiceClient.getAccountByCustomer(customerId != null ? customerId : 1);
            if (accounts.isEmpty()) {
                voiceMessage.append("No active accounts found to generate mini statement.");
            } else {
                Integer firstAccountId = (Integer) accounts.get(0).get("accountId");
                List<Map<String, Object>> transactions = transactionServiceClient.getTransactionHistory(firstAccountId);
                
                voiceMessage.append("Here is your recent transaction history. ");
                if (transactions.isEmpty()) {
                    voiceMessage.append("No recent transactions found on your account.");
                } else {
                    int count = 0;
                    for (Map<String, Object> tx : transactions) {
                        if (count >= 3) break;
                        Object type = tx.get("transactionType");
                        Object amount = tx.get("amount");
                        voiceMessage.append("Transaction ")
                                .append(count + 1)
                                .append(": ")
                                .append(type != null ? type : "Entry")
                                .append(" of Rupees ")
                                .append(amount != null ? amount : "0")
                                .append(". ");
                        count++;
                    }
                }
            }
        } catch (Exception e) {
            voiceMessage.append("Unable to retrieve mini statement at this time.");
        }

        voiceMessage.append(" Thank you for using Banking System IVR Service.");

        responseBuilder.say(new Say.Builder(voiceMessage.toString())
                .voice(Say.Voice.ALICE)
                .language(Say.Language.EN_IN)
                .build());
        responseBuilder.hangup(new Hangup.Builder().build());

        logCall(new IVRCallRequest(customerId != null ? customerId : 1, null, "MINI_STATEMENT", 35));

        return IVRResponseDto.builder()
                .success(true)
                .message("Mini Statement Response Generated")
                .twimlXml(responseBuilder.build().toXml())
                .build();
    }
}