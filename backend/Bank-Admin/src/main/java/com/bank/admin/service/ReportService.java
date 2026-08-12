package com.bank.admin.service;

import java.util.List;

import com.bank.admin.dto.report.ReportRequest;
import com.bank.admin.dto.report.ReportResponse;

public interface ReportService {

    ReportResponse generateReport(
            ReportRequest request);

    List<ReportResponse> getAllReports();

}