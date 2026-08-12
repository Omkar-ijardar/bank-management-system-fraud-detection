package com.bank.admin.validation;

import java.util.regex.Pattern;

public final class PhoneNumberValidator {

    private PhoneNumberValidator() {

    }

    private static final Pattern PATTERN =
            Pattern.compile("^[6-9]\\d{9}$");

    public static boolean isValid(String phoneNumber) {

        if (phoneNumber == null) {
            return false;
        }

        return PATTERN.matcher(phoneNumber).matches();

    }

}