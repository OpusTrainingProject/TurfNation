package com.project.PaymentService.service;

import java.util.List ;
import java.util.Map;


import com.project.PaymentService.entity.OrderDto;
import com.project.PaymentService.entity.OrderResponseDTO;
import com.project.PaymentService.entity.RevenueDTO;
import com.project.PaymentService.entity.WeeklyPaymentDTO;
import com.razorpay.RazorpayException;
import com.project.PaymentService.entity.PaymentDTO;

public interface PaymentService {
	 public Map<String, Object> createOrder(OrderDto dto) throws RazorpayException;
	 OrderResponseDTO createOrder(Long bookingId) throws RazorpayException;
	public boolean verifyPaymentSignature(String razorpay_order_id, String razorpay_payment_id,
			String razorpay_signature) throws RazorpayException;
	
	 // Get all payments
    List<PaymentDTO> getAllPayments();
    
    // Get payments by turf ID
    List<PaymentDTO> getPaymentsByTurfId(Long turfId);
    
    // Get total revenue
    RevenueDTO getTotalRevenue();
    
    // Get revenue by turf ID
    RevenueDTO getRevenueByTurfId(Long turfId);
    
    List<WeeklyPaymentDTO> getWeeklyPaymentStats();
}
