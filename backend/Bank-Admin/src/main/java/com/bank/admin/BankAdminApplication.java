package com.bank.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class BankAdminApplication {

	public static void main(String[] args) {
		SpringApplication.run(BankAdminApplication.class, args);
	}

}
