package com.bank.admin.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bank.admin.dto.role.RoleRequest;
import com.bank.admin.dto.role.RoleResponse;
import com.bank.admin.entity.Role;
import com.bank.admin.exception.ResourceAlreadyExistsException;
import com.bank.admin.exception.ResourceNotFoundException;
import com.bank.admin.mapper.RoleMapper;
import com.bank.admin.repository.RoleRepository;
import com.bank.admin.service.RoleService;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(RoleServiceImpl.class);

    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;

    public RoleServiceImpl(RoleRepository roleRepository,
                           RoleMapper roleMapper) {

        this.roleRepository = roleRepository;
        this.roleMapper = roleMapper;
    }

    @Override
    public RoleResponse createRole(RoleRequest request) {

        LOGGER.info("Creating role : {}", request.getRoleName());

        if (roleRepository.existsByRoleName(request.getRoleName())) {
            throw new ResourceAlreadyExistsException(
                    "Role already exists.");
        }

        Role role = new Role();

        role.setRoleName(request.getRoleName());
        role.setDescription(request.getDescription());

        Role savedRole = roleRepository.save(role);

        LOGGER.info("Role created successfully : {}",
                savedRole.getRoleName());

        return roleMapper.toResponse(savedRole);
    }

    @Override
    public RoleResponse updateRole(Integer roleId,
                                   RoleRequest request) {

        LOGGER.info("Updating role : {}", roleId);

        Role role = getRoleOrThrow(roleId);

        role.setDescription(request.getDescription());

        Role updatedRole = roleRepository.save(role);

        return roleMapper.toResponse(updatedRole);
    }

    @Override
    @Transactional(readOnly = true)
    public RoleResponse getRoleById(Integer roleId) {

        Role role = getRoleOrThrow(roleId);

        return roleMapper.toResponse(role);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RoleResponse> getAllRoles() {

        return roleRepository.findAll()
                .stream()
                .map(roleMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteRole(Integer roleId) {

        Role role = getRoleOrThrow(roleId);

        roleRepository.delete(role);

        LOGGER.info("Role deleted : {}", roleId);
    }

    private Role getRoleOrThrow(Integer roleId) {

        return roleRepository.findById(roleId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Role not found with id : " + roleId));
    }

}