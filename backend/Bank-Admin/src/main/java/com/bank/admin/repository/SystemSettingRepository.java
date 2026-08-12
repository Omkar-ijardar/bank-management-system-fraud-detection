package com.bank.admin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bank.admin.entity.SystemSetting;

@Repository
public interface SystemSettingRepository extends JpaRepository<SystemSetting, Integer> {

    Optional<SystemSetting> findBySettingKey(String settingKey);

}