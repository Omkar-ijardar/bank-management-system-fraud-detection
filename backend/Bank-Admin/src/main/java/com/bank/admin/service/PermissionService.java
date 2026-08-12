package com.bank.admin.service;

import java.util.List;

import com.bank.admin.dto.permission.PermissionResponse;

public interface PermissionService {

    List<PermissionResponse> getAllPermissions();

    PermissionResponse getPermissionById(Integer permissionId);

}