package com.example.TurfServiceImpl;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.example.DTO.PaymentRequest;

@Service
public class PaymentClient {

    private final RestTemplate restTemplate;
    private final String paymentServiceUrl = "http://localhost:8082/payment/process";

    public PaymentClient() {
        this.restTemplate = new RestTemplate();
    }

    public void initiatePayment(PaymentRequest request) {
        try {
            // Fire & Forget call
            restTemplate.postForLocation(paymentServiceUrl, request);

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
