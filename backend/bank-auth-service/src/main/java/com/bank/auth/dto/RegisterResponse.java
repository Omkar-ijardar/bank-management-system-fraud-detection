package com.bank.auth.dto;

public class RegisterResponse {

    private Integer customerId;
    private String message;


    public RegisterResponse() {

    }


    public RegisterResponse(Integer customerId, String message) {
        this.customerId = customerId;
        this.message = message;
    }


    public Integer getCustomerId() {
        return customerId;
    }


    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }


    public String getMessage() {
        return message;
    }


    public void setMessage(String message) {
        this.message = message;
    }

}