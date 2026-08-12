package com.bank.admin.mapper;

import org.springframework.stereotype.Component;

import com.bank.admin.dto.audit.AuditLogResponse;
import com.bank.admin.entity.AuditLog;

@Component
public class AuditLogMapper {

    public AuditLogResponse toResponse(AuditLog auditLog) {

        if (auditLog == null) {
            return null;
        }

        AuditLogResponse response = new AuditLogResponse();

        response.setId(auditLog.getId());
        response.setAction(auditLog.getAction());
        response.setModule(auditLog.getModule());
        response.setEntityName(auditLog.getEntityName());
        response.setEntityId(auditLog.getEntityId());
        response.setDescription(auditLog.getDescription());
        response.setIpAddress(auditLog.getIpAddress());
        response.setCreatedAt(auditLog.getCreatedAt());

        if (auditLog.getAdmin() != null) {
            response.setAdminName(
                    auditLog.getAdmin().getFirstName() + " " +
                    auditLog.getAdmin().getLastName());
        }

        return response;
    }

}