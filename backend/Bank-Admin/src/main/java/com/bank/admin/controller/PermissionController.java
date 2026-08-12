package com.bank.admin.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.bank.admin.dto.common.ApiResponse;
import com.bank.admin.dto.permission.PermissionResponse;
import com.bank.admin.service.PermissionService;

@RestController
@RequestMapping("/api/v1/permissions")
@Validated
public class PermissionController {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(PermissionController.class);

    private final PermissionService permissionService;

    public PermissionController(
            PermissionService permissionService) {

        this.permissionService = permissionService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<PermissionResponse>>> getAllPermissions() {

        LOGGER.info("REST request to fetch all permissions.");

        List<PermissionResponse> permissions =
                permissionService.getAllPermissions();

        ApiResponse<List<PermissionResponse>> response =
                new ApiResponse<>();

        response.setSuccess(true);
        response.setMessage("Permissions fetched successfully.");
        response.setData(permissions);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{permissionId}")
    public ResponseEntity<ApiResponse<PermissionResponse>> getPermissionById(
            @PathVariable Integer permissionId) {

        LOGGER.info("REST request to fetch permission : {}",
                permissionId);

        PermissionResponse permission =
                permissionService.getPermissionById(permissionId);

        ApiResponse<PermissionResponse> response =
                new ApiResponse<>();

        response.setSuccess(true);
        response.setMessage("Permission fetched successfully.");
        response.setData(permission);

        return ResponseEntity.ok(response);
    }

}