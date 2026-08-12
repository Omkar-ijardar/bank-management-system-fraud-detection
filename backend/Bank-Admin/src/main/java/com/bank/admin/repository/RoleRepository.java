package com.bank.admin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bank.admin.entity.Role;
import com.bank.admin.enums.RoleName;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    Optional<Role> findByRoleName(RoleName roleName);

    boolean existsByRoleName(RoleName roleName);

}