package com.bank.admin.mapper;

import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.bank.admin.dto.role.RoleResponse;
import com.bank.admin.entity.Role;

@Component
public class RoleMapper {

    public RoleResponse toResponse(Role role) {

        if (role == null) {
            return null;
        }

        RoleResponse response = new RoleResponse();

        response.setId(role.getId());
        response.setRoleName(role.getRoleName().name());
        response.setDescription(role.getDescription());
        response.setCreatedAt(role.getCreatedAt());

        response.setPermissions(
                role.getPermissions()
                        .stream()
                        .map(permission -> permission.getPermissionName().name())
                        .collect(Collectors.toSet()));

        return response;
    }

}