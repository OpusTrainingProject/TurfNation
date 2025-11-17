package com.project.PaymentService.entity;

import java.math.BigDecimal;
public class RevenueDTO {

	   private BigDecimal totalRevenue;
	    private Long totalPayments;
	    private String message;
	
	public RevenueDTO() {
		
	}

	public RevenueDTO(BigDecimal totalRevenue, Long totalPayments, String message) {
		super();
		this.totalRevenue = totalRevenue;
		this.totalPayments = totalPayments;
		this.message = message;
	}

	public BigDecimal getTotalRevenue() {
		return totalRevenue;
	}

	public void setTotalRevenue(BigDecimal totalRevenue) {
		this.totalRevenue = totalRevenue;
	}

	public Long getTotalPayments() {
		return totalPayments;
	}

	public void setTotalPayments(Long totalPayments) {
		this.totalPayments = totalPayments;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	

}
