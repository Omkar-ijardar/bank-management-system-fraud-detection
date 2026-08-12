package com.bank.admin.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bank.admin.dto.report.ReportRequest;
import com.bank.admin.dto.report.ReportResponse;
import com.bank.admin.entity.Admin;
import com.bank.admin.entity.ReportHistory;
import com.bank.admin.exception.ResourceNotFoundException;
import com.bank.admin.mapper.ReportMapper;
import com.bank.admin.repository.AdminRepository;
import com.bank.admin.repository.ReportHistoryRepository;
import com.bank.admin.security.user.UserPrincipal;
import com.bank.admin.service.ReportService;
import com.bank.admin.util.ReportUtil;

@Service
@Transactional
public class ReportServiceImpl implements ReportService {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(ReportServiceImpl.class);

    private final ReportHistoryRepository reportRepository;
    private final ReportMapper reportMapper;
    private final AdminRepository adminRepository;

    public ReportServiceImpl(
            ReportHistoryRepository reportRepository,
            ReportMapper reportMapper,
            AdminRepository adminRepository) {

        this.reportRepository = reportRepository;
        this.reportMapper = reportMapper;
        this.adminRepository = adminRepository;
    }

    @Override
    public ReportResponse generateReport(ReportRequest request) {

        LOGGER.info("Generating {} report in {} format.",
                request.getReportType(),
                request.getReportFormat());

        Admin currentAdmin = getCurrentAdmin();

        String fileName = ReportUtil.generateFileName(
                request.getReportType().name());

        String extension =
                request.getReportFormat().name().toLowerCase();

        ReportHistory report = new ReportHistory();

        report.setGeneratedBy(currentAdmin);
        report.setReportType(request.getReportType());
        report.setReportFormat(request.getReportFormat());

        report.setFileName(fileName + "." + extension);

        report.setFilePath(
                "/reports/" + fileName + "." + extension);

        ReportHistory saved =
                reportRepository.save(report);

        LOGGER.info("Report generated successfully : {}",
                saved.getFileName());

        return reportMapper.toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReportResponse> getAllReports() {

        LOGGER.info("Fetching report history.");

        return reportRepository.findAll()
                .stream()
                .map(reportMapper::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Returns currently logged-in admin.
     */
    private Admin getCurrentAdmin() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        UserPrincipal principal =
                (UserPrincipal) authentication.getPrincipal();

//        return adminRepository.findByUsername(
//                principal.getUsername())
//                .orElseThrow(() ->
//                        new RuntimeException(
//                                "Logged-in admin not found."));
        
        return adminRepository.findById(principal.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Admin not found."));
    }

}