package com.bank.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bank.auth.entity.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    boolean existsByEmail(String email);

    boolean existsByMobile(String mobile);

    boolean existsByAadhaarNumber(String aadhaarNumber);

    boolean existsByPanNumber(String panNumber);

    Optional<Customer> findByMobile(String mobile);

    Optional<Customer> findByEmail(String email);

}