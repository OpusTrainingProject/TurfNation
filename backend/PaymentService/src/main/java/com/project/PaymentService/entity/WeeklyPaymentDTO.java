package com.project.PaymentService.entity;

import java.math.BigDecimal;

public class WeeklyPaymentDTO {

	private String week;         // Date in DD/MM format (e.g., "15/11")
    private BigDecimal amount; 
	
	public WeeklyPaymentDTO() {
		
	}

	public WeeklyPaymentDTO(String week, BigDecimal amount) {
	
		this.week = week;
		this.amount = amount;
	}

	public String getWeek() {
		return week;
	}

	public void setWeek(String week) {
		this.week = week;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	
	
}
