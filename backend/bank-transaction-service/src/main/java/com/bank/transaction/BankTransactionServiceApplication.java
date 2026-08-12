package com.bank.transaction;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BankTransactionServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BankTransactionServiceApplication.class, args);
		System.out.println("Started...");
	}

}
