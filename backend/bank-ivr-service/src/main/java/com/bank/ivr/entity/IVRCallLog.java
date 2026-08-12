package com.bank.ivr.entity;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "IVRCallLog")
public class IVRCallLog {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer callId;
	
	@Column(nullable = false)
	private Integer customerId;
	
	private String serviceType;
	
	private LocalDateTime callTime = LocalDateTime.now();
	
	private Integer duration;

	public IVRCallLog() {}

	public IVRCallLog(Integer callId, Integer customerId, String serviceType, LocalDateTime callTime, Integer duration) {
		this.callId = callId;
		this.customerId = customerId;
		this.serviceType = serviceType;
		this.callTime = callTime;
		this.duration = duration;
	}

	public Integer getCallId() { return callId; }
	public void setCallId(Integer callId) { this.callId = callId; }
	public Integer getCustomerId() { return customerId; }
	public void setCustomerId(Integer customerId) { this.customerId = customerId; }
	public String getServiceType() { return serviceType; }
	public void setServiceType(String serviceType) { this.serviceType = serviceType; }
	public LocalDateTime getCallTime() { return callTime; }
	public void setCallTime(LocalDateTime callTime) { this.callTime = callTime; }
	public Integer getDuration() { return duration; }
	public void setDuration(Integer duration) { this.duration = duration; }
}
