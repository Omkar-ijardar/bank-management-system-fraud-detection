package com.bank.admin.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.bank.admin.dto.common.ApiResponse;
import com.bank.admin.dto.role.RoleRequest;
import com.bank.admin.dto.role.RoleResponse;
import com.bank.admin.service.RoleService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/roles")
@Validated
public class RoleController {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(RoleController.class);

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<RoleResponse>> createRole(
            @Valid @RequestBody RoleRequest request) {

        LOGGER.info("REST request to create role.");

        RoleResponse role = roleService.createRole(request);

        ApiResponse<RoleResponse> response = new ApiResponse<>();
        response.setSuccess(true);
        response.setMessage("Role created successfully.");
        response.setData(role);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{roleId}")
    public ResponseEntity<ApiResponse<RoleResponse>> updateRole(
            @PathVariable Integer roleId,
            @Valid @RequestBody RoleRequest request) {

        LOGGER.info("REST request to update role : {}", roleId);

        RoleResponse role =
                roleService.updateRole(roleId, request);

        ApiResponse<RoleResponse> response = new ApiResponse<>();
        response.setSuccess(true);
        response.setMessage("Role updated successfully.");
        response.setData(role);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{roleId}")
    public ResponseEntity<ApiResponse<RoleResponse>> getRoleById(
            @PathVariable Integer roleId) {

        LOGGER.info("REST request to fetch role : {}", roleId);

        RoleResponse role =
                roleService.getRoleById(roleId);

        ApiResponse<RoleResponse> response = new ApiResponse<>();
        response.setSuccess(true);
        response.setMessage("Role fetched successfully.");
        response.setData(role);

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<RoleResponse>>> getAllRoles() {

        LOGGER.info("REST request to fetch all roles.");

        List<RoleResponse> roles =
                roleService.getAllRoles();

        ApiResponse<List<RoleResponse>> response =
                new ApiResponse<>();

        response.setSuccess(true);
        response.setMessage("Roles fetched successfully.");
        response.setData(roles);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{roleId}")
    public ResponseEntity<ApiResponse<Void>> deleteRole(
            @PathVariable Integer roleId) {

        LOGGER.info("REST request to delete role : {}", roleId);

        roleService.deleteRole(roleId);

        ApiResponse<Void> response = new ApiResponse<>();
        response.setSuccess(true);
        response.setMessage("Role deleted successfully.");

        return ResponseEntity.ok(response);
    }

}