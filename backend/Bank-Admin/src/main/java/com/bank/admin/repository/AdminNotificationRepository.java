package com.bank.admin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bank.admin.entity.AdminNotification;
import com.bank.admin.enums.NotificationStatus;

@Repository
public interface AdminNotificationRepository extends JpaRepository<AdminNotification, Integer> {

    List<AdminNotification> findByStatus(NotificationStatus status);

}