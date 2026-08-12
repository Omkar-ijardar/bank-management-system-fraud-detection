package com.bank.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;

@Configuration
public class SwaggerConfig {
	
	@Bean
	public OpenAPI bankOpenAPI() {

	    return new OpenAPI()

	            .info(new Info()

	                    .title("Bank Management System - Authentication Service")

	                    .description(
	                            "Authentication and Registration Module for Bank Management System")

	                    .version("1.0")

	                    .contact(new Contact()
	                            .name("Rohan Barkade")
	                            .email("your-email@gmail.com"))

	                    .license(new License()
	                            .name("MIT License")
	                            .url("https://opensource.org/licenses/MIT")));
	}
}