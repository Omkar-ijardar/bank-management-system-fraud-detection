package com.bank.admin.validation;

import java.util.regex.Pattern;

public final class PasswordValidator {

    private PasswordValidator() {

    }

    private static final Pattern PATTERN =
            Pattern.compile(
                    "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%^&+=!]).{8,20}$"
            );

    public static boolean isValid(String password) {

        if (password == null) {
            return false;
        }

        return PATTERN.matcher(password).matches();

    }

}