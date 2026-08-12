package com.bank.admin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.bank.admin.entity.Admin;

@Repository
public interface AdminRepository
extends JpaRepository<Admin, Integer>,
        JpaSpecificationExecutor<Admin>{
   
	Optional<Admin> findByUsername(String username);

    Optional<Admin> findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

}