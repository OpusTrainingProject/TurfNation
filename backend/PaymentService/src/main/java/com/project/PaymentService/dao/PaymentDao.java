package com.project.PaymentService.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.PaymentService.entity.Payment;

@Repository
public interface PaymentDao extends JpaRepository<Payment, Long>{
	public Optional<Payment> findByRazorpayOrderId(String orderId);
}
