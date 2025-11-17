package com.project.PaymentService.dao;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.PaymentService.entity.Payment;
import com.project.PaymentService.entity.Payment.PaymentStatus;

@Repository
public interface PaymentDao extends JpaRepository<Payment, Long>{
	public Optional<Payment> findByRazorpayOrderId(String orderId);
<<<<<<< HEAD
	 Optional<Payment> findByBookingId(Long bookingId);
=======
	
	// In PaymentRepository.java
	List<Payment> findByTurfId(Long turfId);

	@Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p WHERE p.paymentStatus = 'SUCCESS'")
	BigDecimal getTotalRevenue();

	@Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p WHERE p.turfId = :turfId AND p.paymentStatus = 'SUCCESS'")
	BigDecimal getTotalRevenueByTurfId(@Param("turfId") Long turfId);

	Long countByPaymentStatus(PaymentStatus paymentStatus);
	
	@Query("SELECT DATE(p.createdOn), SUM(p.amount) " +
		       "FROM Payment p " +
		       "WHERE p.createdOn >= :startDate " +
		       "AND p.paymentStatus = 'SUCCESS' " +
		       "GROUP BY DATE(p.createdOn) " +
		       "ORDER BY DATE(p.createdOn)")
		List<Object[]> getWeeklyPaymentStats(@Param("startDate") LocalDateTime startDate);

>>>>>>> 9b0177ffa4ffd86db588679f015e6af406b41cb4
}
