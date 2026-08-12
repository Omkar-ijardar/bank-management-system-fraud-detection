package com.bank.admin.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("Bank Admin Service API")
                        .version("1.0")
                        .description("Admin Microservice APIs")
                        .contact(new Contact()
                                .name("Bank Development Team")
                                .email("support@bank.com")));

    }

}