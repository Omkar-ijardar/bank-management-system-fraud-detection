package com.bank.ivr.dto;

public class IVRMenuSelectionDto {
    private Integer customerId;
    private String digits;
    private String callSid;
    private String fromNumber;

    public IVRMenuSelectionDto() {}

    public IVRMenuSelectionDto(Integer customerId, String digits, String callSid, String fromNumber) {
        this.customerId = customerId;
        this.digits = digits;
        this.callSid = callSid;
        this.fromNumber = fromNumber;
    }

    public Integer getCustomerId() { return customerId; }
    public void setCustomerId(Integer customerId) { this.customerId = customerId; }
    public String getDigits() { return digits; }
    public void setDigits(String digits) { this.digits = digits; }
    public String getCallSid() { return callSid; }
    public void setCallSid(String callSid) { this.callSid = callSid; }
    public String getFromNumber() { return fromNumber; }
    public void setFromNumber(String fromNumber) { this.fromNumber = fromNumber; }
}