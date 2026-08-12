package com.bank.transactions.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.transactions.entity.Transaction;

/**
 * Spring Data JPA repository for the Transaction entity.
 * This is the ONLY repository the Transaction Service owns — there is no
 * AccountRepository here, by design (see AccountClient).
 */
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
