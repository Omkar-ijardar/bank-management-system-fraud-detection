package com.bank.transactions.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

/**
 * Provides a shared WebClient.Builder bean. Individual client classes
 * (e.g. AccountClient) inject this builder via their constructor and use it
 * to build a WebClient scoped to their own base URL, keeping base-URL
 * configuration out of this shared config class.
 */
@Configuration
public class WebClientConfig {

    @Bean
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }
}
