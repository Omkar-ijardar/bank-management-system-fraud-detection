package com.bank.admin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bank.admin.entity.LoginHistory;

@Repository
public interface LoginHistoryRepository extends JpaRepository<LoginHistory, Integer> {

    List<LoginHistory> findByAdminId(Integer adminId);

}