package com.bank.admin.util;

public final class ValidationUtil {

    private ValidationUtil() {
    }

    public static boolean hasText(String value) {

        return value != null &&
                !value.trim().isEmpty();
    }

    public static boolean isNull(Object object) {

        return object == null;
    }

}