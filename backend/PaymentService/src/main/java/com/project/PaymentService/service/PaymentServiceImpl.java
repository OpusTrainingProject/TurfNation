package com.project.PaymentService.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
import com.project.PaymentService.entity.PaymentDTO;
import com.project.PaymentService.entity.PaymentResponseDto;
import com.project.PaymentService.entity.RevenueDTO;
import com.project.PaymentService.entity.WeeklyPaymentDTO;
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

<<<<<<< HEAD
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
=======
//	@Override
//    public boolean verifyPaymentSignature(String orderId, String paymentId, String signature) throws RazorpayException {
//        JSONObject options = new JSONObject();
//		options.put("razorpay_order_id", orderId);
//		options.put("razorpay_payment_id", paymentId);
//		options.put("razorpay_signature", signature);
//		
//		Payment payment = dao.findByRazorpayOrderId(orderId)
//		        .orElseThrow(() -> new RuntimeException("Payment record not found"));
//				
//		try { 
//		boolean status = Utils.verifyPaymentSignature(options, keySecret);
//		if(status) {
//			payment.setPaymentStatus(Payment.PaymentStatus.SUCCESS);
//		}
//		else {
//			payment.setPaymentStatus(Payment.PaymentStatus.FAILED);
//		}
//		dao.save(payment);
//		return status;
//		} catch(Exception e) {
//			payment.setPaymentStatus(PaymentStatus.FAILED);
//	        dao.save(payment);
//	        return false;
//		}
//		finally {
//			if(! payment.getPaymentStatus().equals(Payment.PaymentStatus.PENDING)) {
//			PaymentResponseDto response= new PaymentResponseDto();
//			response.setBookingId(payment.getBookingId());
//			response.setPaymentMethod(payment.getPaymentMethod());
//			response.setPaymentStatus(payment.getPaymentStatus());
//			restTemplate.postForEntity("http://BookingService/paymentstatusupdate", response, String.class);// Booking method call
//		}
//		}
//    }
	
	

	
	 private PaymentDTO convertToDTO(Payment payment) {
	        PaymentDTO dto = new PaymentDTO();
	        dto.setPaymentId(payment.getPaymentId());
	        dto.setTurfId(payment.getTurfId());
	        dto.setBookingId(payment.getBookingId());
	        dto.setUserId(payment.getUserId());
	        dto.setAmount(payment.getAmount());
	        dto.setRazorpayPaymentId(payment.getRazorpayPaymentId());
	        dto.setPaymentMethod(payment.getPaymentMethod().toString());
	        dto.setPaymentStatus(payment.getPaymentStatus().toString());
	        dto.setCreatedOn(payment.getCreatedOn());
	        return dto;
	    }
	
	@Override
	public List<PaymentDTO> getAllPayments() {
	    List<Payment> payments = dao.findAll();
	    return payments.stream()
	            .map(this::convertToDTO)
	            .collect(Collectors.toList());
	}

	@Override
	public List<PaymentDTO> getPaymentsByTurfId(Long turfId) {
	    List<Payment> payments = dao.findByTurfId(turfId);
	    return payments.stream()
	            .map(this::convertToDTO)
	            .collect(Collectors.toList());
	}

	@Override
	public RevenueDTO getTotalRevenue() {
	    BigDecimal totalRevenue = dao.getTotalRevenue();
	    Long totalPayments = dao.countByPaymentStatus(Payment.PaymentStatus.SUCCESS);
	    
	    return new RevenueDTO(
	        totalRevenue != null ? totalRevenue : BigDecimal.ZERO,
	        totalPayments,
	        "Total revenue calculated successfully"
	    );
	}

	@Override
	public RevenueDTO getRevenueByTurfId(Long turfId) {
	    BigDecimal revenue = dao.getTotalRevenueByTurfId(turfId);
	    List<Payment> payments = dao.findByTurfId(turfId);
	    
	    long successfulPayments = payments.stream()
	            .filter(p -> p.getPaymentStatus() == Payment.PaymentStatus.SUCCESS)
	            .count();
	    
	    return new RevenueDTO(
	        revenue != null ? revenue : BigDecimal.ZERO,
	        successfulPayments,
	        "Revenue for Turf ID " + turfId + " calculated successfully"
	    );
	}
	
	@Override
	public List<WeeklyPaymentDTO> getWeeklyPaymentStats() {
	    // Calculate date 8 weeks (56 days) ago from today
	    LocalDateTime eightWeeksAgo = LocalDateTime.now().minusDays(56);
	    
	    // Get payments grouped by date from repository
	    List<Object[]> results = dao.getWeeklyPaymentStats(eightWeeksAgo);
	    
	    // Convert results to DTO list
	    List<WeeklyPaymentDTO> weeklyStats = new ArrayList<>();
	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM");
	    
	    // Loop through each result row
	    for (Object[] result : results) {
	        // result[0] = date (LocalDate from DATE function), result[1] = total amount (BigDecimal)
	        java.sql.Date sqlDate = (java.sql.Date) result[0];
	        LocalDate date = sqlDate.toLocalDate();
	        BigDecimal amount = (BigDecimal) result[1];
	        
	        // Format date as DD/MM (e.g., "15/11")
	        String formattedDate = date.format(formatter);
	        
	        // Create DTO and add to list
	        WeeklyPaymentDTO dto = new WeeklyPaymentDTO();
	        dto.setWeek(formattedDate);
	        dto.setAmount(amount != null ? amount : BigDecimal.ZERO);
	        weeklyStats.add(dto);
	    }
	    
	    return weeklyStats;


}
}
>>>>>>> 9b0177ffa4ffd86db588679f015e6af406b41cb4
