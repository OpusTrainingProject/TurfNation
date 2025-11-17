package com.project.PaymentService.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class PaymentDTO {

	    private Long paymentId;
	    private Long turfId;
	    private Long bookingId;
	    private Long userId;
	    private BigDecimal amount;
	    private String razorpayPaymentId;
	    private String paymentMethod;
	    private String paymentStatus;
	    private LocalDateTime createdOn;
	
	
	public PaymentDTO() {
		// TODO Auto-generated constructor stub
	}


	public PaymentDTO(Long paymentId, Long turfId, Long bookingId, Long userId, BigDecimal amount,
			String razorpayPaymentId, String paymentMethod, String paymentStatus, LocalDateTime createdOn) {
		
		this.paymentId = paymentId;
		this.turfId = turfId;
		this.bookingId = bookingId;
		this.userId = userId;
		this.amount = amount;
		this.razorpayPaymentId = razorpayPaymentId;
		this.paymentMethod = paymentMethod;
		this.paymentStatus = paymentStatus;
		this.createdOn = createdOn;
	}


	public Long getPaymentId() {
		return paymentId;
	}


	public void setPaymentId(Long paymentId) {
		this.paymentId = paymentId;
	}


	public Long getTurfId() {
		return turfId;
	}


	public void setTurfId(Long turfId) {
		this.turfId = turfId;
	}


	public Long getBookingId() {
		return bookingId;
	}


	public void setBookingId(Long bookingId) {
		this.bookingId = bookingId;
	}


	public Long getUserId() {
		return userId;
	}


	public void setUserId(Long userId) {
		this.userId = userId;
	}


	public BigDecimal getAmount() {
		return amount;
	}


	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}


	public String getRazorpayPaymentId() {
		return razorpayPaymentId;
	}


	public void setRazorpayPaymentId(String razorpayPaymentId) {
		this.razorpayPaymentId = razorpayPaymentId;
	}


	public String getPaymentMethod() {
		return paymentMethod;
	}


	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}


	public String getPaymentStatus() {
		return paymentStatus;
	}


	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}


	public LocalDateTime getCreatedOn() {
		return createdOn;
	}


	public void setCreatedOn(LocalDateTime createdOn) {
		this.createdOn = createdOn;
	}

	
	
}
