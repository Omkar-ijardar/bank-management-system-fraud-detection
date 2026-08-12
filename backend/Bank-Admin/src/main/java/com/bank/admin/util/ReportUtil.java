package com.bank.admin.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class ReportUtil {

    private ReportUtil() {

    }

    public static String generateFileName(String reportName) {

        String timestamp =
                LocalDateTime.now()
                        .format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));

        return reportName + "_" + timestamp;
    }

}