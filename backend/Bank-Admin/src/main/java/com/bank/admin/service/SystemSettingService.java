package com.bank.admin.service;

public interface SystemSettingService {

    String getSetting(String key);

    void updateSetting(String key,
                       String value);

}