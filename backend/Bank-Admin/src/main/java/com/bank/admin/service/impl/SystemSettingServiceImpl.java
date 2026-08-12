package com.bank.admin.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bank.admin.entity.SystemSetting;
import com.bank.admin.exception.ResourceNotFoundException;
import com.bank.admin.repository.SystemSettingRepository;
import com.bank.admin.service.SystemSettingService;

@Service
@Transactional
public class SystemSettingServiceImpl implements SystemSettingService {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(SystemSettingServiceImpl.class);

    private final SystemSettingRepository systemSettingRepository;

    public SystemSettingServiceImpl(
            SystemSettingRepository systemSettingRepository) {

        this.systemSettingRepository = systemSettingRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public String getSetting(String key) {

        LOGGER.info("Fetching system setting : {}", key);

        return getSettingEntity(key).getSettingValue();
    }

    @Override
    public void updateSetting(String key, String value) {

        LOGGER.info("Updating system setting : {}", key);

        SystemSetting setting = getSettingEntity(key);

        setting.setSettingValue(value);

        systemSettingRepository.save(setting);

        LOGGER.info("System setting updated successfully : {}", key);
    }

    /**
     * Returns SystemSetting or throws ResourceNotFoundException.
     */
    private SystemSetting getSettingEntity(String key) {

        return systemSettingRepository.findBySettingKey(key)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "System setting not found : " + key));
    }
}