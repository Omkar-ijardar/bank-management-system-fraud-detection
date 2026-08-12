package com.bank.admin.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bank.admin.dto.audit.AuditLogResponse;
import com.bank.admin.dto.common.PageResponse;
import com.bank.admin.entity.AuditLog;
import com.bank.admin.mapper.AuditLogMapper;
import com.bank.admin.repository.AuditLogRepository;
import com.bank.admin.service.AuditService;

@Service
@Transactional(readOnly = true)
public class AuditServiceImpl implements AuditService {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(AuditServiceImpl.class);

    private final AuditLogRepository auditLogRepository;
    private final AuditLogMapper auditLogMapper;

    public AuditServiceImpl(AuditLogRepository auditLogRepository,
                            AuditLogMapper auditLogMapper) {

        this.auditLogRepository = auditLogRepository;
        this.auditLogMapper = auditLogMapper;
    }

    @Override
    public PageResponse<AuditLogResponse> getAuditLogs(Pageable pageable) {

        LOGGER.info("Fetching audit logs. Page : {}, Size : {}",
                pageable.getPageNumber(),
                pageable.getPageSize());

        Page<AuditLog> auditLogPage =
                auditLogRepository.findAll(pageable);

        List<AuditLogResponse> auditLogs =
                auditLogPage.getContent()
                        .stream()
                        .map(auditLogMapper::toResponse)
                        .collect(Collectors.toList());

        LOGGER.info("Fetched {} audit logs.",
                auditLogs.size());

        PageResponse<AuditLogResponse> response = new PageResponse<>();

        response.setContent(auditLogs);
        response.setPageNo(auditLogPage.getNumber());
        response.setPageSize(auditLogPage.getSize());
        response.setTotalElements(auditLogPage.getTotalElements());
        response.setTotalPages(auditLogPage.getTotalPages());
        response.setLast(auditLogPage.isLast());

        return response;
    }

}