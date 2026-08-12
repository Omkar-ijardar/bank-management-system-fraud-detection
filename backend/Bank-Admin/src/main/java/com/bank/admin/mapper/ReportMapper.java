package com.bank.admin.mapper;

import org.springframework.stereotype.Component;

import com.bank.admin.dto.report.ReportResponse;
import com.bank.admin.entity.ReportHistory;

@Component
public class ReportMapper {

    public ReportResponse toResponse(ReportHistory report) {

        if (report == null) {
            return null;
        }

        ReportResponse response = new ReportResponse();

        response.setId(report.getId());
        response.setReportType(report.getReportType());
        response.setReportFormat(report.getReportFormat());
        response.setFileName(report.getFileName());
        response.setFilePath(report.getFilePath());
        response.setGeneratedAt(report.getCreatedAt());

        if (report.getGeneratedBy() != null) {
            response.setGeneratedBy(
                    report.getGeneratedBy().getFirstName() + " " +
                    report.getGeneratedBy().getLastName());
        }

        return response;
    }

}