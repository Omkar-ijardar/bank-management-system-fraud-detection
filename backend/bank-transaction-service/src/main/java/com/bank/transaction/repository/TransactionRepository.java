package com.bank.transaction.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bank.transaction.entity.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
	
	//List<Transaction> findByAccountIdOrderByTransactionTimeDesc(Integer accountId);
	
	Optional<Transaction> findByReferenceNumber(String referenceNumber);

	List<Transaction> findByAccountIdOrderByTransactionTimeDesc(Integer accountId);

	long countByStatus(com.bank.transaction.entity.TransactionStatus status);

	@org.springframework.data.jpa.repository.Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.status = com.bank.transaction.entity.TransactionStatus.Success")
	java.math.BigDecimal sumTotalAmount();
}
