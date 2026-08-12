package com.bank.admin.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bank.admin.dto.permission.PermissionResponse;
import com.bank.admin.entity.Permission;
import com.bank.admin.exception.ResourceNotFoundException;
import com.bank.admin.mapper.PermissionMapper;
import com.bank.admin.repository.PermissionRepository;
import com.bank.admin.service.PermissionService;

@Service
@Transactional(readOnly = true)
public class PermissionServiceImpl implements PermissionService {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(PermissionServiceImpl.class);

    private final PermissionRepository permissionRepository;
    private final PermissionMapper permissionMapper;

    public PermissionServiceImpl(PermissionRepository permissionRepository,
                                 PermissionMapper permissionMapper) {

        this.permissionRepository = permissionRepository;
        this.permissionMapper = permissionMapper;
    }

    @Override
    public List<PermissionResponse> getAllPermissions() {

        LOGGER.info("Fetching all permissions.");

        List<PermissionResponse> permissions = permissionRepository.findAll()
                .stream()
                .map(permissionMapper::toResponse)
                .collect(Collectors.toList());

        LOGGER.info("Total permissions fetched : {}", permissions.size());

        return permissions;
    }

    @Override
    public PermissionResponse getPermissionById(Integer permissionId) {

        LOGGER.info("Fetching permission with id : {}", permissionId);

        Permission permission = getPermissionOrThrow(permissionId);

        return permissionMapper.toResponse(permission);
    }

    /**
     * Returns permission or throws ResourceNotFoundException.
     */
    private Permission getPermissionOrThrow(Integer permissionId) {

        return permissionRepository.findById(permissionId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Permission not found with id : " + permissionId));
    }

}