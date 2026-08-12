package com.bank.admin.mapper;

import org.springframework.stereotype.Component;

import com.bank.admin.dto.permission.PermissionResponse;
import com.bank.admin.entity.Permission;

@Component
public class PermissionMapper {

    public PermissionResponse toResponse(Permission permission) {

        if (permission == null) {
            return null;
        }

        PermissionResponse response = new PermissionResponse();

        response.setId(permission.getId());
        response.setPermissionName(permission.getPermissionName().name());
        response.setDescription(permission.getDescription());

        return response;
    }

}