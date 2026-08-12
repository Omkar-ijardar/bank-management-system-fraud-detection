package com.bank.admin.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.admin.dto.audit.AuditLogResponse;
import com.bank.admin.dto.common.ApiResponse;
import com.bank.admin.dto.common.PageResponse;
import com.bank.admin.service.AuditService;

@RestController
@RequestMapping("/api/v1/audit-logs")
@Validated
public class AuditController {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(AuditController.class);

    private final AuditService auditService;

    public AuditController(AuditService auditService) {
        this.auditService = auditService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<AuditLogResponse>>> getAuditLogs(
            Pageable pageable) {

        LOGGER.info("REST request to fetch audit logs.");

        ApiResponse<PageResponse<AuditLogResponse>> response =
                new ApiResponse<>();

        response.setSuccess(true);
        response.setMessage("Audit logs fetched successfully.");
        response.setData(auditService.getAuditLogs(pageable));

        return ResponseEntity.ok(response);
    }

}