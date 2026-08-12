package com.bank.admin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bank.admin.entity.AuditLog;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Integer> {

    List<AuditLog> findByAdminId(Integer adminId);

}