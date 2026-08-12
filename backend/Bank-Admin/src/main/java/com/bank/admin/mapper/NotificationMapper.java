package com.bank.admin.mapper;

import org.springframework.stereotype.Component;

import com.bank.admin.dto.notification.NotificationResponse;
import com.bank.admin.entity.AdminNotification;

@Component
public class NotificationMapper {

    public NotificationResponse toResponse(AdminNotification notification) {

        if (notification == null) {
            return null;
        }

        NotificationResponse response = new NotificationResponse();

        response.setId(notification.getId());
        response.setTitle(notification.getTitle());
        response.setMessage(notification.getMessage());
        response.setNotificationType(notification.getNotificationType());
        response.setStatus(notification.getStatus());
        response.setSent(notification.getSent());
        response.setCreatedAt(notification.getCreatedAt());

        return response;
    }

}