package com.project.PaymentService.contoller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.PaymentService.entity.OrderDto;
import com.project.PaymentService.entity.PaymentVerifyReq;
import com.project.PaymentService.service.PaymentService;
import com.razorpay.RazorpayException;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @PostMapping("/order")
    public ResponseEntity<Map<String, Object>> createOrder(@RequestBody OrderDto dto) throws RazorpayException {
        Map<String, Object> response = paymentService.createOrder(dto);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyPayment(@RequestBody PaymentVerifyReq request) throws RazorpayException {
        boolean isValid = paymentService.verifyPaymentSignature(
                request.getRazorpayOrderId(),
                request.getRazorpayPaymentId(),
                request.getSignature()
        );

        if (isValid) {
            return ResponseEntity.ok("Payment verified successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid payment signature");
        }
    }
}
