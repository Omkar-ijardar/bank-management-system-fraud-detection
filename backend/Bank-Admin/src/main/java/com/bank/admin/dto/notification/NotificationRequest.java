package com.bank.admin.dto.notification;

import com.bank.admin.enums.NotificationType;

import jakarta.validation.constraints.NotBlank;

public class NotificationRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String message;

    private NotificationType notificationType;

	public NotificationRequest() {
		super();
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public NotificationType getNotificationType() {
		return notificationType;
	}

	public void setNotificationType(NotificationType notificationType) {
		this.notificationType = notificationType;
	}

    
}