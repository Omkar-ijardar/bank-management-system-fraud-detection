package com.bank.ivr.service;

import java.util.List;
import com.bank.ivr.dto.IVRCallRequest;
import com.bank.ivr.dto.IVRResponseDto;
import com.bank.ivr.entity.IVRCallLog;

public interface IVRService {
    IVRCallLog logCall(IVRCallRequest request);
    List<IVRCallLog> getCallLogsByCustomer(Integer customerId);
    List<IVRCallLog> getAllCallLogs();
    
    IVRResponseDto handleWelcomeCall();
    IVRResponseDto handleMenuOption(Integer customerId, String digits);
    IVRResponseDto getAccountBalanceResponse(Integer customerId);
    IVRResponseDto getMiniStatementResponse(Integer customerId);
}