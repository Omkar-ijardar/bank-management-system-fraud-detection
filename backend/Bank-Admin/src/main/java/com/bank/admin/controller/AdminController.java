package com.bank.admin.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.bank.admin.dto.admin.AdminProfileResponse;
import com.bank.admin.dto.admin.AdminRequest;
import com.bank.admin.dto.admin.AdminResponse;
import com.bank.admin.dto.admin.UpdateAdminRequest;
import com.bank.admin.dto.common.PageResponse;
import com.bank.admin.service.AdminService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/admins")
@Validated
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    private static final Logger LOGGER =
            LoggerFactory.getLogger(AdminController.class);
    
    @PostMapping
    public ResponseEntity<AdminResponse> createAdmin(
            @Valid @RequestBody AdminRequest request) {

        AdminResponse response = adminService.createAdmin(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{adminId}")
    public ResponseEntity<AdminResponse> updateAdmin(
            @PathVariable Integer adminId,
            @Valid @RequestBody UpdateAdminRequest request) {

        return ResponseEntity.ok(
                adminService.updateAdmin(adminId, request));
    }

    @GetMapping("/{adminId}")
    public ResponseEntity<AdminResponse> getAdminById(
            @PathVariable Integer adminId) {

        return ResponseEntity.ok(
                adminService.getAdminById(adminId));
    }

    @GetMapping
    public ResponseEntity<PageResponse<AdminResponse>> getAllAdmins(

            @RequestParam(required = false) String keyword,

            @RequestParam(required = false) Integer roleId,

            @RequestParam(required = false) Boolean active,

            Pageable pageable) {

        return ResponseEntity.ok(

                adminService.getAllAdmins(
                        keyword,
                        roleId,
                        active,
                        pageable)

        );
    }

    @DeleteMapping("/{adminId}")
    public ResponseEntity<Void> deleteAdmin(
            @PathVariable Integer adminId) {

        adminService.deleteAdmin(adminId);

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{adminId}/activate")
    public ResponseEntity<AdminResponse> activateAdmin(
            @PathVariable Integer adminId) {

        return ResponseEntity.ok(
                adminService.activateAdmin(adminId));
    }

    @PatchMapping("/{adminId}/deactivate")
    public ResponseEntity<AdminResponse> deactivateAdmin(
            @PathVariable Integer adminId) {

        return ResponseEntity.ok(
                adminService.deactivateAdmin(adminId));
    }

    @PatchMapping("/{adminId}/lock")
    public ResponseEntity<AdminResponse> lockAdmin(
            @PathVariable Integer adminId) {

        return ResponseEntity.ok(
                adminService.lockAdmin(adminId));
    }

    @PatchMapping("/{adminId}/unlock")
    public ResponseEntity<AdminResponse> unlockAdmin(
            @PathVariable Integer adminId) {

        return ResponseEntity.ok(
                adminService.unlockAdmin(adminId));
    }

    @GetMapping("/profile")
    public ResponseEntity<AdminProfileResponse> getProfile() {

        return ResponseEntity.ok(
                adminService.getLoggedInAdminProfile());
    }

}