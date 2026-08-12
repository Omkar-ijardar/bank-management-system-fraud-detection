package com.bank.admin.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.admin.dto.common.ApiResponse;
import com.bank.admin.dto.dashboard.DashboardResponse;
import com.bank.admin.service.DashboardService;

@RestController
@RequestMapping("/api/v1/dashboard")
@Validated
public class DashboardController {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(DashboardController.class);

    private final DashboardService dashboardService;

    public DashboardController(
            DashboardService dashboardService) {

        this.dashboardService = dashboardService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<DashboardResponse>> getDashboard() {

        LOGGER.info("REST request to fetch dashboard summary.");

        DashboardResponse dashboard =
                dashboardService.getDashboard();

        ApiResponse<DashboardResponse> response =
                new ApiResponse<>();

        response.setSuccess(true);
        response.setMessage("Dashboard fetched successfully.");
        response.setData(dashboard);

        return ResponseEntity.ok(response);
    }

}