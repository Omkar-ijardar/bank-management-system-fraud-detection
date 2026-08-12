package com.bank.admin.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.bank.admin.dto.common.ApiResponse;
import com.bank.admin.dto.report.ReportRequest;
import com.bank.admin.dto.report.ReportResponse;
import com.bank.admin.service.ReportService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/reports")
@Validated
public class ReportController {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(ReportController.class);

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ReportResponse>> generateReport(
            @Valid @RequestBody ReportRequest request) {

        LOGGER.info("REST request to generate report.");

        ApiResponse<ReportResponse> response =
                new ApiResponse<>();

        response.setSuccess(true);
        response.setMessage("Report generated successfully.");
        response.setData(
                reportService.generateReport(request));

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ReportResponse>>> getAllReports() {

        LOGGER.info("REST request to fetch reports.");

        ApiResponse<List<ReportResponse>> response =
                new ApiResponse<>();

        response.setSuccess(true);
        response.setMessage("Reports fetched successfully.");
        response.setData(
                reportService.getAllReports());

        return ResponseEntity.ok(response);
    }

}