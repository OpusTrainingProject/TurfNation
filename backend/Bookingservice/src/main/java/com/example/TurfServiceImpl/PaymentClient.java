package com.example.TurfServiceImpl;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.example.DTO.PaymentRequest;

@Service
public class PaymentClient {

    private final RestTemplate restTemplate;
    private final String paymentServiceUrl = "http://PaymentService/payment/order";

    public PaymentClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void initiatePayment(PaymentRequest request) {
        try {
            // Fire & Forget call
        
        	        restTemplate.postForEntity(paymentServiceUrl, request, Map.class);


            System.out.println("✅ Payment initiation sent for Booking ID: " + request.getBookingId());
        } 
        catch (RestClientException ex) {

            System.err.println("❌ Payment Service DOWN. Marking booking as CANCELLED for bookingId: " 
                                + request.getBookingId());

            // You can handle fallback logic here (optional)
            // Example: Update booking status to CANCELLED directly OR
            // set a retry job OR store event for async retry.
        }
    }
}
