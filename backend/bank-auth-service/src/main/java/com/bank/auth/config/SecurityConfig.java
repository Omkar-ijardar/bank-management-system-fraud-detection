package com.bank.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
        	.cors(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable())

            .sessionManagement(session ->
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            .authorizeHttpRequests(auth -> auth

                    .requestMatchers(
                            "/api/auth/register",
                            "/api/auth/login",
                            "/api/auth/verify-otp",
                            "/api/auth/forgot-password",
                            "/api/auth/reset-password",
                            "/api/auth/customers/**",
                            "/api/auth/internal/**",
                            "/swagger-ui/**",
                            "/v3/api-docs/**"
                    ).permitAll()

                    .anyRequest().authenticated())

            .httpBasic(httpBasic -> httpBasic.disable());

        http.addFilterBefore(
                jwtFilter,
                UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
