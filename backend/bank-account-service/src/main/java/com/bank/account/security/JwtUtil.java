package com.bank.account.security;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	private final SecretKey key;
	
	public JwtUtil(@Value("${jwt.secret}") String secret) {
		this.key = Keys.hmacShaKeyFor(secret.getBytes());
	}
	
	public Claims extractClaims(String token) {
		return Jwts.parser()
				.verifyWith(key)
				.build()
				.parseSignedClaims(token)
				.getPayload();
	}
	
//	public Integer extraxctCustomerId(String token) {
//		return extractClaims(token).get("customerId", Integer.class);
//	}
	
	public boolean isToeknValid(String token) {
		try {
			extractClaims(token);
			return true;
		}catch(Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
}
