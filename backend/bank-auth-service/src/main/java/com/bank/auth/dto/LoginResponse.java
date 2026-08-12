package com.bank.auth.dto;

public class LoginResponse {

    private Integer customerId;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
    private String token;
    private String message;

    public LoginResponse() {
    }

    public LoginResponse(
            Integer customerId,
            String firstName,
            String lastName,
            String email,
            String role,
            String token,
            String message) {

        this.customerId = customerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.token = token;
        this.message = message;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "LoginResponse [customerId=" + customerId
                + ", firstName=" + firstName
                + ", lastName=" + lastName
                + ", email=" + email
                + ", role=" + role
                + ", token=" + token
                + ", message=" + message + "]";
    }
}