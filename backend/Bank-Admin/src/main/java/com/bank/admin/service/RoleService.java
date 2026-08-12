package com.bank.admin.service;

import java.util.List;

import com.bank.admin.dto.role.RoleRequest;
import com.bank.admin.dto.role.RoleResponse;

public interface RoleService {

    RoleResponse createRole(RoleRequest request);

    RoleResponse updateRole(Integer roleId,
                            RoleRequest request);

    RoleResponse getRoleById(Integer roleId);

    List<RoleResponse> getAllRoles();

    void deleteRole(Integer roleId);

}