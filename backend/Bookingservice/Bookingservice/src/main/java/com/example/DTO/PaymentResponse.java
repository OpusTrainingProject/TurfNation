package com.example.DTO;

import com.example.enums.Enums.PaymentStatus;
import com.example.enums.Enums.PaymentMethod;


public class PaymentResponse {
    private Long bookingId;
    private PaymentStatus paymentStatus;   
    private PaymentMethod paymentMethod;   
    
    
    public PaymentResponse() {
    	
    }


	public PaymentResponse(Long bookingId, PaymentStatus paymentStatus, PaymentMethod paymentMethod) {
		super();
		this.bookingId = bookingId;
		this.paymentStatus = paymentStatus;
		this.paymentMethod = paymentMethod;
	}


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
