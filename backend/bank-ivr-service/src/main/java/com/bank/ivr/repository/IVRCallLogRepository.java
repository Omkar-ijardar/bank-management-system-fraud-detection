package com.bank.ivr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bank.ivr.entity.IVRCallLog;

@Repository
public interface IVRCallLogRepository extends JpaRepository<IVRCallLog, Integer> {
    List<IVRCallLog> findByCustomerIdOrderByCallTimeDesc(Integer customerId);
}