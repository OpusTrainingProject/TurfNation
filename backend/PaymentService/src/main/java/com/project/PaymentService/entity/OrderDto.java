package com.project.PaymentService.entity;

import java.math.BigDecimal;

public class OrderDto {
	private BigDecimal amount;
	private Long bookingId;
	private Currency currency;
	private Long userId;
	private Long turfId;
	
	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
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

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public Currency getCurrency() {
		return currency;
	}

	public void setCurrency(Currency currency) {
		this.currency = currency;
	}

	public enum Currency{
		INR, USD, EUR, GBP
	}
}
