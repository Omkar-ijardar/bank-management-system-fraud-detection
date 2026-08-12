package com.bank.admin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bank.admin.entity.Permission;
import com.bank.admin.enums.PermissionName;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Integer> {

    Optional<Permission> findByPermissionName(PermissionName permissionName);

    boolean existsByPermissionName(PermissionName permissionName);

}