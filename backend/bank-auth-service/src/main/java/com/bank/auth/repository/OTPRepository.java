package com.bank.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.auth.entity.Customer;
import com.bank.auth.entity.OTP;

public interface OTPRepository extends JpaRepository<OTP, Long>{
	Optional<OTP> findTopByCustomerOrderByCreatedAtDesc(Customer customer);
	

}
