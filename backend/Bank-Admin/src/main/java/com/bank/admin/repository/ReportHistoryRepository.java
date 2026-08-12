package com.bank.admin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bank.admin.entity.ReportHistory;

@Repository
public interface ReportHistoryRepository extends JpaRepository<ReportHistory, Integer> {

    List<ReportHistory> findByGeneratedById(Integer adminId);

}