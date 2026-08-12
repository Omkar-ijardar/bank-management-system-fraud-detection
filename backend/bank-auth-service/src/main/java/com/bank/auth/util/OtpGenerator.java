package com.bank.auth.util;

import java.util.Random;

public class OtpGenerator {
	private static final Random random = new Random();
	
	public static String generateOtp() {
		int otp = 100000 + random.nextInt(900000);
		return String.valueOf(otp);
	}

}
