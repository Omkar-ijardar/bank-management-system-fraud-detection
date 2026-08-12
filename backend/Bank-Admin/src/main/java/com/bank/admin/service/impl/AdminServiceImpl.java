package com.bank.admin.service.impl;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bank.admin.dto.admin.AdminProfileResponse;
import com.bank.admin.dto.admin.AdminRequest;
import com.bank.admin.dto.admin.AdminResponse;
import com.bank.admin.dto.admin.UpdateAdminRequest;
import com.bank.admin.dto.common.PageResponse;
import com.bank.admin.entity.Admin;
import com.bank.admin.entity.Role;
import com.bank.admin.exception.ResourceAlreadyExistsException;
import com.bank.admin.exception.ResourceNotFoundException;
import com.bank.admin.mapper.AdminMapper;
import com.bank.admin.repository.AdminRepository;
import com.bank.admin.repository.RoleRepository;
import com.bank.admin.service.AdminService;
import com.bank.admin.service.AuditService;
import com.bank.admin.service.NotificationService;
@Service
@Transactional
public class AdminServiceImpl implements AdminService {

	private final AdminRepository adminRepository;
	private final RoleRepository roleRepository;
	private final AdminMapper adminMapper;
	private final PasswordEncoder passwordEncoder;
	private final AuditService auditService;
	private final NotificationService notificationService;
	private static final Logger LOGGER =
            LoggerFactory.getLogger(AdminServiceImpl.class);

	public AdminServiceImpl(
	        AdminRepository adminRepository,
	        RoleRepository roleRepository,
	        AdminMapper adminMapper,
	        PasswordEncoder passwordEncoder,
	        AuditService auditService,
	        NotificationService notificationService) {

	    this.adminRepository = adminRepository;
	    this.roleRepository = roleRepository;
	    this.adminMapper = adminMapper;
	    this.passwordEncoder = passwordEncoder;
	    this.auditService = auditService;
	    this.notificationService = notificationService;
	}


    @Override
    public AdminResponse createAdmin(AdminRequest request) {

        LOGGER.info("Creating new admin : {}", request.getUsername());

        checkDuplicateUsername(request.getUsername());

        checkDuplicateEmail(request.getEmail());

        Role role = getRoleOrThrow(request.getRoleId());

        Admin admin = adminMapper.toEntity(request);

        admin.setPassword(
                passwordEncoder.encode(request.getPassword()));

        admin.setRole(role);

        Admin savedAdmin = adminRepository.save(admin);

        LOGGER.info("Admin created successfully with id : {}",
                savedAdmin.getId());

        /*
         * TODO
         * auditService.log(...)
         * notificationService.send(...)
         */

        return adminMapper.toResponse(savedAdmin);
    }

    // ======================================================
    // Remaining methods will be implemented in next phases
    // ======================================================

    

    @Override
    public PageResponse<AdminResponse> getAllAdmins(
            String keyword,
            Integer roleId,
            Boolean active,
            Pageable pageable) {
        throw new UnsupportedOperationException("Not implemented yet.");
    }

   

    
    
    // ======================================================
    // Private Helper Methods
    // ======================================================

    private Role getRoleOrThrow(Integer roleId) {

        return roleRepository.findById(roleId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Role not found with id : " + roleId));
    }

    private void checkDuplicateUsername(String username) {

        if (adminRepository.existsByUsername(username)) {

            throw new ResourceAlreadyExistsException(
                    "Username already exists.");

        }

    }

    private void checkDuplicateEmail(String email) {

        if (adminRepository.existsByEmail(email)) {

            throw new ResourceAlreadyExistsException(
                    "Email already exists.");

        }

    }

    private Admin getAdminOrThrow(Integer adminId) {

        Optional<Admin> optional =
                adminRepository.findById(adminId);

        if (optional.isEmpty()) {

            throw new ResourceNotFoundException(
                    "Admin not found with id : " + adminId);

        }

        return optional.get();

    }
    
    @Override
    public AdminResponse updateAdmin(Integer adminId,
                                     UpdateAdminRequest request) {

        LOGGER.info("Updating admin with id : {}", adminId);

        Admin admin = getAdminOrThrow(adminId);

        // First Name
        if (request.getFirstName() != null &&
                !request.getFirstName().trim().isEmpty()) {

            admin.setFirstName(request.getFirstName().trim());
        }

        // Last Name
        if (request.getLastName() != null &&
                !request.getLastName().trim().isEmpty()) {

            admin.setLastName(request.getLastName().trim());
        }

        // Email
        if (request.getEmail() != null &&
                !request.getEmail().equalsIgnoreCase(admin.getEmail())) {

            if (adminRepository.existsByEmail(request.getEmail())) {

                throw new ResourceAlreadyExistsException(
                        "Email already exists.");
            }

            admin.setEmail(request.getEmail());
        }

        // Phone Number
        if (request.getPhoneNumber() != null) {
            admin.setPhoneNumber(request.getPhoneNumber());
        }

        // Role
        if (request.getRoleId() != null) {

            Role role = getRoleOrThrow(request.getRoleId());

            admin.setRole(role);
        }

        // Active Status
        if (request.getActive() != null) {
            admin.setActive(request.getActive());
        }

        Admin updatedAdmin = adminRepository.save(admin);

        LOGGER.info("Admin updated successfully : {}", adminId);

        // TODO
        // auditService.log(...);

        return adminMapper.toResponse(updatedAdmin);
    }
    
    @Override
    @Transactional(readOnly = true)
    public AdminResponse getAdminById(Integer adminId) {

        LOGGER.info("Fetching admin with id : {}", adminId);

        Admin admin = getAdminOrThrow(adminId);

        return adminMapper.toResponse(admin);

    }
    
    @Override
    public void deleteAdmin(Integer adminId) {

        LOGGER.info("Deleting admin : {}", adminId);

        Admin admin = getAdminOrThrow(adminId);

        admin.setActive(false);
        admin.setDeleted(true);

        adminRepository.save(admin);

        // TODO
        // auditService.log(...);

        LOGGER.info("Admin deleted successfully : {}", adminId);

    }
    
    @Override
    public AdminResponse activateAdmin(Integer adminId) {

        Admin admin = getAdminOrThrow(adminId);

        admin.setActive(true);

        Admin updated = adminRepository.save(admin);

        LOGGER.info("Admin activated : {}", adminId);

        return adminMapper.toResponse(updated);

    }
    
    @Override
    public AdminResponse deactivateAdmin(Integer adminId) {

        Admin admin = getAdminOrThrow(adminId);

        admin.setActive(false);

        Admin updated = adminRepository.save(admin);

        LOGGER.info("Admin deactivated : {}", adminId);

        return adminMapper.toResponse(updated);

    }
    
    @Override
    public AdminResponse lockAdmin(Integer adminId) {

        Admin admin = getAdminOrThrow(adminId);

        admin.setAccountLocked(true);

        Admin updated = adminRepository.save(admin);

        LOGGER.info("Admin locked : {}", adminId);

        return adminMapper.toResponse(updated);

    }
    
    @Override
    public AdminResponse unlockAdmin(Integer adminId) {

        Admin admin = getAdminOrThrow(adminId);

        admin.setAccountLocked(false);

        Admin updated = adminRepository.save(admin);

        LOGGER.info("Admin unlocked : {}", adminId);

        return adminMapper.toResponse(updated);

    }
    
    @Override
    @Transactional(readOnly = true)
    public AdminProfileResponse getLoggedInAdminProfile() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String username = authentication.getName();

        Admin admin = adminRepository.findByUsername(username)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Admin not found."));

        AdminProfileResponse response = new AdminProfileResponse();

        response.setId(admin.getId());
        response.setFirstName(admin.getFirstName());
        response.setLastName(admin.getLastName());
        response.setUsername(admin.getUsername());
        response.setEmail(admin.getEmail());
        response.setPhoneNumber(admin.getPhoneNumber());
        response.setProfileImage(admin.getProfileImage());

        if (admin.getRole() != null) {
            response.setRole(admin.getRole().getRoleName().name());
        }

        response.setLastLogin(admin.getLastLogin());

        return response;
    }
    
    
    
}