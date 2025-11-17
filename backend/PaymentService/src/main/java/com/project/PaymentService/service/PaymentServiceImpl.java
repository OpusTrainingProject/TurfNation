package com.project.PaymentService.service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.project.PaymentService.dao.PaymentDao;
import com.project.PaymentService.entity.OrderDto;
import com.project.PaymentService.entity.OrderDto.Currency;
import com.project.PaymentService.entity.OrderResponseDTO;
import com.project.PaymentService.entity.Payment;
import com.project.PaymentService.entity.Payment.PaymentStatus;
import com.project.PaymentService.entity.PaymentResponseDto;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;

@Service
public class PaymentServiceImpl implements PaymentService{

	@Value("${razorpay.key.id}")
	private String keyId;

	@Value("${razorpay.key.secret}")
	private String keySecret;

	@Autowired
	private PaymentDao dao;

	@Autowired
	private RestTemplate restTemplate;

	@Override
	public Map<String, Object> createOrder(OrderDto dto) throws RazorpayException {

		RazorpayClient client = new RazorpayClient(keyId, keySecret);
		dto.setCurrency(Currency.INR);
		JSONObject orderRequest = new JSONObject();
		orderRequest.put("amount", dto.getAmount().multiply(BigDecimal.valueOf(100)).intValue());
		orderRequest.put("currency", dto.getCurrency().toString());
		orderRequest.put("receipt", "txn_" + System.currentTimeMillis());

		Order order = client.Orders.create(orderRequest);

		Payment payment = new Payment();
		payment.setBookingId(dto.getBookingId());
		payment.setUserId(dto.getUserId());
		payment.setTurfId(dto.getTurfId());
		payment.setAmount(dto.getAmount());
		payment.setPaymentStatus(Payment.PaymentStatus.PENDING);
		payment.setPaymentMethod(Payment.PaymentMethod.CARD);
		payment.setRazorpayOrderId(order.get("id"));
		payment.setReceipt(order.get("receipt"));
		dao.save(payment);


		Map<String, Object> response = new HashMap<>();
		response.put("orderId", order.get("id"));
		response.put("amount", order.get("amount"));
		response.put("currency", order.get("currency"));
		response.put("status", order.get("status"));


		return response;
	}

	@Override
	public boolean verifyPaymentSignature(String orderId, String paymentId, String signature) throws RazorpayException {
		JSONObject options = new JSONObject();
		options.put("razorpay_order_id", orderId);
		options.put("razorpay_payment_id", paymentId);
		options.put("razorpay_signature", signature);

		Payment payment = dao.findByRazorpayOrderId(orderId)
				.orElseThrow(() -> new RuntimeException("Payment record not found"));
		
		boolean status = false;

		try {
			status = Utils.verifyPaymentSignature(options, keySecret);
			payment.setPaymentStatus(status ? PaymentStatus.SUCCESS : PaymentStatus.FAILED);
			payment.setRazorpaySignature(signature);
			payment.setRazorpayPaymentId(paymentId);
		} catch (Exception e) {
			payment.setPaymentStatus(PaymentStatus.FAILED);
		} finally {
			dao.save(payment);

			if (payment.getPaymentStatus() != PaymentStatus.PENDING) {
				PaymentResponseDto response = new PaymentResponseDto();
				response.setBookingId(payment.getBookingId());
				response.setPaymentMethod(payment.getPaymentMethod());
				response.setPaymentStatus(payment.getPaymentStatus());

				try {
					restTemplate.postForEntity(
							"http://BookingService/booking/payment-status",response,String.class);
				} catch (Exception ex) {
					System.err.println("Booking service update failed: " + ex.getMessage());
				}
			}
		}

		return status;
	}
	
	 public OrderResponseDTO createOrder(Long bookingId) throws RazorpayException {
	        
	        // Find payment record by bookingId
	        Payment payment = dao.findByBookingId(bookingId)
	                .orElseThrow(() -> new IllegalArgumentException("No payment order found for booking ID: " + bookingId));
	        
	        // Validate payment status
	        if (payment.getPaymentStatus() == PaymentStatus.SUCCESS) {
	            throw new IllegalArgumentException("Payment already completed for booking ID: " + bookingId);
	        }
	        
	        // Check if razorpay order ID exists
	        if (payment.getRazorpayOrderId() == null || payment.getRazorpayOrderId().isEmpty()) {
	            throw new IllegalArgumentException("Razorpay order not created for this booking");
	        }
	        
	        // Build response DTO
	        OrderResponseDTO response = new OrderResponseDTO();
	        response.setAmount(payment.getAmount());
	        response.setRazorpayOrderId(payment.getRazorpayOrderId());
	        response.setCurrency("INR");
	        
	        return response;
	    }
}