package com.project.PaymentService.service;

import java.util.Map;

import com.project.PaymentService.entity.OrderDto;
import com.project.PaymentService.entity.OrderResponseDTO;
import com.razorpay.RazorpayException;

public interface PaymentService {
	 public Map<String, Object> createOrder(OrderDto dto) throws RazorpayException;
	 OrderResponseDTO createOrder(Long bookingId) throws RazorpayException;
	public boolean verifyPaymentSignature(String razorpay_order_id, String razorpay_payment_id,
			String razorpay_signature) throws RazorpayException;
}
