package com.bank.ivr.dto;

public class IVRCallRequest {
    private Integer customerId;
    private Integer accountId;
    private String serviceType;
    private Integer duration;

    public IVRCallRequest() {}

    public IVRCallRequest(Integer customerId, Integer accountId, String serviceType, Integer duration) {
        this.customerId = customerId;
        this.accountId = accountId;
        this.serviceType = serviceType;
        this.duration = duration;
    }

    public Integer getCustomerId() { return customerId; }
    public void setCustomerId(Integer customerId) { this.customerId = customerId; }
    public Integer getAccountId() { return accountId; }
    public void setAccountId(Integer accountId) { this.accountId = accountId; }
    public String getServiceType() { return serviceType; }
    public void setServiceType(String serviceType) { this.serviceType = serviceType; }
    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }
}