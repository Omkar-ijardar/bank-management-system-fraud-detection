package com.bank.admin.service;

import org.springframework.data.domain.Pageable;

import com.bank.admin.dto.audit.AuditLogResponse;
import com.bank.admin.dto.common.PageResponse;

public interface AuditService {

    PageResponse<AuditLogResponse> getAuditLogs(Pageable pageable);

}