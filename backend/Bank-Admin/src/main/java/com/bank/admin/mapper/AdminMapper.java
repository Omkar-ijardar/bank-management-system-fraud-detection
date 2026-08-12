package com.bank.admin.mapper;

import org.springframework.stereotype.Component;

import com.bank.admin.dto.admin.AdminRequest;
import com.bank.admin.dto.admin.AdminResponse;
import com.bank.admin.entity.Admin;

@Component
public class AdminMapper {

    public Admin toEntity(AdminRequest request) {

        if (request == null) {
            return null;
        }

        Admin admin = new Admin();

        admin.setFirstName(request.getFirstName());
        admin.setLastName(request.getLastName());
        admin.setUsername(request.getUsername());
        admin.setEmail(request.getEmail());
        admin.setPassword(request.getPassword());
        admin.setPhoneNumber(request.getPhoneNumber());

        return admin;
    }

    public AdminResponse toResponse(Admin admin) {

        if (admin == null) {
            return null;
        }

        AdminResponse response = new AdminResponse();

        response.setId(admin.getId());
        response.setFirstName(admin.getFirstName());
        response.setLastName(admin.getLastName());
        response.setUsername(admin.getUsername());
        response.setEmail(admin.getEmail());
        response.setPhoneNumber(admin.getPhoneNumber());
        response.setProfileImage(admin.getProfileImage());
        response.setStatus(admin.getStatus().name());
        response.setLastLogin(admin.getLastLogin());
        response.setCreatedAt(admin.getCreatedAt());

        if (admin.getRole() != null) {
            response.setRole(admin.getRole().getRoleName().name());
        }

        return response;
    }

}