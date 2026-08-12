package com.bank.transactions.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

/**
 * Generates unique, human-readable reference numbers for transactions.
 * Format: TXN-yyyyMMdd-XXXXXXXX (date + 8-character uppercase hex suffix),
 * e.g. TXN-20260726-7F91A2B3
 */
public final class ReferenceGenerator {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("yyyyMMdd");

    private ReferenceGenerator() {
        // utility class — no instances
    }

    public static String generate() {
        String datePart = LocalDate.now().format(DATE_FORMAT);
        String randomPart = UUID.randomUUID().toString()
                .replace("-", "")
                .substring(0, 8)
                .toUpperCase();
        return "TXN-" + datePart + "-" + randomPart;
    }
}
