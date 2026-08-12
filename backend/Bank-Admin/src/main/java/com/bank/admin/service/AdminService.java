package com.bank.admin.service;

import org.springframework.data.domain.Pageable;

import com.bank.admin.dto.admin.AdminProfileResponse;
import com.bank.admin.dto.admin.AdminRequest;
import com.bank.admin.dto.admin.AdminResponse;
import com.bank.admin.dto.admin.UpdateAdminRequest;
import com.bank.admin.dto.common.PageResponse;

public interface AdminService {

    AdminResponse createAdmin(AdminRequest request);

    AdminResponse updateAdmin(Integer adminId,
                              UpdateAdminRequest request);

    AdminResponse getAdminById(Integer adminId);

    PageResponse<AdminResponse> getAllAdmins(
            String keyword,
            Integer roleId,
            Boolean active,
            Pageable pageable);
    
    void deleteAdmin(Integer adminId);

    AdminResponse  activateAdmin(Integer adminId);

    AdminResponse  deactivateAdmin(Integer adminId);

    AdminResponse  lockAdmin(Integer adminId);

    AdminResponse  unlockAdmin(Integer adminId);

    AdminProfileResponse getLoggedInAdminProfile();

}