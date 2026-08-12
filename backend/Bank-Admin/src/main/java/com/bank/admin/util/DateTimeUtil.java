package com.bank.admin.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public final class DateTimeUtil {

    private static final String DEFAULT_PATTERN =
            "yyyy-MM-dd HH:mm:ss";

    private DateTimeUtil() {
    }

    public static String format(LocalDateTime dateTime) {

        if (dateTime == null) {
            return null;
        }

        return dateTime.format(
                DateTimeFormatter.ofPattern(DEFAULT_PATTERN));
    }

    public static String format(
            LocalDateTime dateTime,
            String pattern) {

        if (dateTime == null) {
            return null;
        }

        return dateTime.format(
                DateTimeFormatter.ofPattern(pattern));
    }

    public static LocalDateTime now() {
        return LocalDateTime.now();
    }

}