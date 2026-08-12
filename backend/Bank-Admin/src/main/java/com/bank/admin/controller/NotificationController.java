package com.bank.admin.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.bank.admin.dto.common.ApiResponse;
import com.bank.admin.dto.notification.NotificationRequest;
import com.bank.admin.dto.notification.NotificationResponse;
import com.bank.admin.service.NotificationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/notifications")
@Validated
public class NotificationController {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(NotificationController.class);

    private final NotificationService notificationService;

    public NotificationController(
            NotificationService notificationService) {

        this.notificationService = notificationService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<NotificationResponse>> sendNotification(
            @Valid @RequestBody NotificationRequest request) {

        LOGGER.info("REST request to send notification.");

        ApiResponse<NotificationResponse> response =
                new ApiResponse<>();

        response.setSuccess(true);
        response.setMessage("Notification sent successfully.");
        response.setData(
                notificationService.sendNotification(request));

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<NotificationResponse>>> getAllNotifications() {

        LOGGER.info("REST request to fetch notifications.");

        ApiResponse<List<NotificationResponse>> response =
                new ApiResponse<>();

        response.setSuccess(true);
        response.setMessage("Notifications fetched successfully.");
        response.setData(
                notificationService.getAllNotifications());

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{notificationId}/read")
    public ResponseEntity<ApiResponse<Void>> markAsRead(
            @PathVariable Integer notificationId) {

        LOGGER.info("REST request to mark notification as read : {}",
                notificationId);

        notificationService.markAsRead(notificationId);

        ApiResponse<Void> response =
                new ApiResponse<>();

        response.setSuccess(true);
        response.setMessage("Notification marked as read.");

        return ResponseEntity.ok(response);
    }

}