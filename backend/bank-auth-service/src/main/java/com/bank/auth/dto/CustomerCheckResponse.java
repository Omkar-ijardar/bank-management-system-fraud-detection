package com.bank.auth.dto;

public class CustomerCheckResponse {

	    private Integer customerId;
	    private boolean exists;
	    private String status;

	    // Default Constructor
	    public CustomerCheckResponse() {
	    }

	    // Parameterized Constructor
	    public CustomerCheckResponse(Integer customerId, boolean exists, String status) {
	        this.customerId = customerId;
	        this.exists = exists;
	        this.status = status;
	    }

	    // Getters and Setters
	    public Integer getCustomerId() {
	        return customerId;
	    }

	    public void setCustomerId(Integer customerId) {
	        this.customerId = customerId;
	    }

	    public boolean isExists() {
	        return exists;
	    }

	    public void setExists(boolean exists) {
	        this.exists = exists;
	    }

	    public String getStatus() {
	        return status;
	    }

	    public void setStatus(String status) {
	        this.status = status;
	    }
}

