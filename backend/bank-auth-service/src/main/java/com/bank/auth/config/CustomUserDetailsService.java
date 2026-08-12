package com.bank.auth.config;

import java.util.Collections;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.bank.auth.entity.Customer;
import com.bank.auth.repository.CustomerRepository;


@Service
public class CustomUserDetailsService implements UserDetailsService {


    private final CustomerRepository customerRepository;


    public CustomUserDetailsService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {


        Customer customer = customerRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "Customer not found"));


        return new User(
                customer.getEmail(),
                customer.getPasswordHash(),
                Collections.emptyList()
        );
    }

}