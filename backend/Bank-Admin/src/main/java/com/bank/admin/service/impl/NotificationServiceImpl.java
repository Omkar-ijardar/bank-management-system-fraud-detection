package com.bank.admin.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bank.admin.dto.notification.NotificationRequest;
import com.bank.admin.dto.notification.NotificationResponse;
import com.bank.admin.entity.AdminNotification;
import com.bank.admin.enums.NotificationStatus;
import com.bank.admin.exception.ResourceNotFoundException;
import com.bank.admin.mapper.NotificationMapper;
import com.bank.admin.repository.AdminNotificationRepository;
import com.bank.admin.service.NotificationService;

@Service
@Transactional
public class NotificationServiceImpl implements NotificationService {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(NotificationServiceImpl.class);

    private final AdminNotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;

    public NotificationServiceImpl(
            AdminNotificationRepository notificationRepository,
            NotificationMapper notificationMapper) {

        this.notificationRepository = notificationRepository;
        this.notificationMapper = notificationMapper;
    }

    @Override
    public NotificationResponse sendNotification(
            NotificationRequest request) {

        LOGGER.info("Sending notification : {}", request.getTitle());

        AdminNotification notification = new AdminNotification();

        notification.setTitle(request.getTitle());
        notification.setMessage(request.getMessage());
        notification.setNotificationType(
                request.getNotificationType());

        notification.setStatus(NotificationStatus.UNREAD);

        /*
         * Future Enhancement:
         * Integrate Email/SMS/Push Notification service here.
         */
        notification.setSent(Boolean.TRUE);

        AdminNotification savedNotification =
                notificationRepository.save(notification);

        LOGGER.info("Notification sent successfully. Id : {}",
                savedNotification.getId());

        return notificationMapper.toResponse(savedNotification);
    }

    @Override
    @Transactional(readOnly = true)
    public List<NotificationResponse> getAllNotifications() {

        LOGGER.info("Fetching all notifications.");

        List<NotificationResponse> notifications =
                notificationRepository.findAll()
                        .stream()
                        .map(notificationMapper::toResponse)
                        .collect(Collectors.toList());

        LOGGER.info("Total notifications fetched : {}",
                notifications.size());

        return notifications;
    }

    @Override
    public void markAsRead(Integer notificationId) {

        LOGGER.info("Marking notification as READ : {}",
                notificationId);

        AdminNotification notification =
                getNotificationOrThrow(notificationId);

        notification.setStatus(NotificationStatus.READ);

        notificationRepository.save(notification);

        LOGGER.info("Notification marked as READ.");
    }

    /**
     * Returns notification or throws ResourceNotFoundException.
     */
    private AdminNotification getNotificationOrThrow(
            Integer notificationId) {

        return notificationRepository.findById(notificationId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Notification not found with id : "
                                        + notificationId));
    }

}