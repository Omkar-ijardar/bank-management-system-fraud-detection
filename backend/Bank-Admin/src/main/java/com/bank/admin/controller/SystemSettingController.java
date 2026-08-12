package com.bank.admin.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.bank.admin.dto.common.ApiResponse;
import com.bank.admin.service.SystemSettingService;

@RestController
@RequestMapping("/api/v1/system-settings")
@Validated
public class SystemSettingController {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(SystemSettingController.class);

    private final SystemSettingService systemSettingService;

    public SystemSettingController(
            SystemSettingService systemSettingService) {

        this.systemSettingService = systemSettingService;
    }

    @GetMapping("/{key}")
    public ResponseEntity<ApiResponse<String>> getSetting(
            @PathVariable String key) {

        LOGGER.info("REST request to fetch setting : {}", key);

        ApiResponse<String> response =
                new ApiResponse<>();

        response.setSuccess(true);
        response.setMessage("System setting fetched successfully.");
        response.setData(
                systemSettingService.getSetting(key));

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{key}")
    public ResponseEntity<ApiResponse<Void>> updateSetting(
            @PathVariable String key,
            @RequestParam String value) {

        LOGGER.info("REST request to update setting : {}", key);

        systemSettingService.updateSetting(key, value);

        ApiResponse<Void> response =
                new ApiResponse<>();

        response.setSuccess(true);
        response.setMessage("System setting updated successfully.");

        return ResponseEntity.ok(response);
    }

}