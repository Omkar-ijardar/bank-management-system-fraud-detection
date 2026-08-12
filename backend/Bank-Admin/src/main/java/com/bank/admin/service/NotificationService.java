package com.bank.admin.service;

import java.util.List;

import com.bank.admin.dto.notification.NotificationRequest;
import com.bank.admin.dto.notification.NotificationResponse;

public interface NotificationService {

    NotificationResponse sendNotification(
            NotificationRequest request);

    List<NotificationResponse> getAllNotifications();

    void markAsRead(Integer notificationId);

}