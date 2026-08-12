package com.bank.transaction.security;

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

    public String extractEmail(String token) {

        return extractClaims(token).getSubject();

    }

    public boolean isTokenValid(String token) {

        try {

            extractClaims(token);

            return true;

        } catch (Exception e) {

            return false;

        }

    }

}
