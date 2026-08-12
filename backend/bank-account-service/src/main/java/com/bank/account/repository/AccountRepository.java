package com.bank.account.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.account.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Integer>{

	boolean existsByAccountNumber(String number);

	List<Account> findByCustomerId(Integer customerId);
	
	boolean existsByCustomerIdAndAccountType(Integer customerId,Account.AccountType accountType);

	long countByStatus(Account.AccountStatus status);
}
