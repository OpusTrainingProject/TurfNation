package com.project.PaymentService.entity;

import com.project.PaymentService.entity.Payment.PaymentMethod;
import com.project.PaymentService.entity.Payment.PaymentStatus;

public class PaymentResponseDto {
	private Long bookingId;
	private PaymentStatus paymentStatus;
	private PaymentMethod paymentMethod;
	public Long getBookingId() {
		return bookingId;
	}
	public void setBookingId(Long bookingId) {
		this.bookingId = bookingId;
	}
	public PaymentStatus getPaymentStatus() {
		return paymentStatus;
	}
	public void setPaymentStatus(PaymentStatus paymentStatus) {
		this.paymentStatus = paymentStatus;
	}
	public PaymentMethod getPaymentMethod() {
		return paymentMethod;
	}
	public void setPaymentMethod(PaymentMethod paymentMethod) {
		this.paymentMethod = paymentMethod;
	}
	

}
