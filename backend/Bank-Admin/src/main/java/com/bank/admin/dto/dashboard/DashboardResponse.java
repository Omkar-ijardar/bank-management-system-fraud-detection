package com.bank.admin.dto.dashboard;

import java.math.BigDecimal;

public class DashboardResponse {

    private Long totalCustomers;

    private Long activeCustomers;

    private Long totalAccounts;

    private Long activeAccounts;

   

	private Long totalTransactions;
    
    private BigDecimal totalTransactionAmount;

    private Long successfulTransactions;

    private Long failedTransactions;

    private Long totalFraudCases;

    private Long pendingFraudCases;

    private Long totalAdmins;

    private Long totalIvrCalls;

	public DashboardResponse() {
		super();
	}

	public Long getTotalCustomers() {
		return totalCustomers;
	}

	public void setTotalCustomers(Long totalCustomers) {
		this.totalCustomers = totalCustomers;
	}

	public Long getActiveCustomers() {
		return activeCustomers;
	}

	public void setActiveCustomers(Long activeCustomers) {
		this.activeCustomers = activeCustomers;
	}

	public Long getTotalAccounts() {
		return totalAccounts;
	}

	public void setTotalAccounts(Long totalAccounts) {
		this.totalAccounts = totalAccounts;
	}

	public Long getActiveAccounts() {
		return activeAccounts;
	}

	public void setActiveAccounts(Long activeAccounts) {
		this.activeAccounts = activeAccounts;
	}

	

	public Long getSuccessfulTransactions() {
		return successfulTransactions;
	}

	public void setSuccessfulTransactions(Long successfulTransactions) {
		this.successfulTransactions = successfulTransactions;
	}

	public Long getFailedTransactions() {
		return failedTransactions;
	}

	public void setFailedTransactions(Long failedTransactions) {
		this.failedTransactions = failedTransactions;
	}

	

	public BigDecimal getTotalTransactionAmount() {
		return totalTransactionAmount;
	}

	public void setTotalTransactionAmount(BigDecimal totalTransactionAmount) {
		this.totalTransactionAmount = totalTransactionAmount;
	}

	public Long getTotalFraudCases() {
		return totalFraudCases;
	}

	public void setTotalFraudCases(Long totalFraudCases) {
		this.totalFraudCases = totalFraudCases;
	}

	public Long getTotalIvrCalls() {
		return totalIvrCalls;
	}

	public void setTotalIvrCalls(Long totalIvrCalls) {
		this.totalIvrCalls = totalIvrCalls;
	}

	public Long getPendingFraudCases() {
		return pendingFraudCases;
	}

	public void setPendingFraudCases(Long pendingFraudCases) {
		this.pendingFraudCases = pendingFraudCases;
	}

	public Long getTotalAdmins() {
		return totalAdmins;
	}

	public void setTotalAdmins(Long totalAdmins) {
		this.totalAdmins = totalAdmins;
	}
	
	 public Long getTotalTransactions() {
			return totalTransactions;
		}

	public void setTotalTransactions(Long totalTransactions) {
			this.totalTransactions = totalTransactions;
		}

    
}