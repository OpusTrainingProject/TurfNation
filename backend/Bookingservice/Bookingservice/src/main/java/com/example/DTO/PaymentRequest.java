package com.example.DTO;

import java.math.BigDecimal;

public class PaymentRequest {
    private Long bookingId;
    private BigDecimal amount;
    private Long userId;
	private Long turfId;
	
    public PaymentRequest() {
    	
    }
    


	public PaymentRequest(Long bookingId, BigDecimal amount, Long userId, Long turfId) {
		super();
		this.bookingId = bookingId;
		this.amount = amount;
		this.userId = userId;
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

	
    
    
    
}
