package com.project.PaymentService.contoller;


import org.springframework.web.bind.annotation.RequestMapping ;
import org.springframework.web.bind.annotation.RestController;

import com.project.PaymentService.entity.OrderDto;
import com.project.PaymentService.entity.PaymentDTO;
import com.project.PaymentService.entity.PaymentVerifyReq;
import com.project.PaymentService.entity.RevenueDTO;
import com.project.PaymentService.entity.WeeklyPaymentDTO;
import com.project.PaymentService.service.PaymentService;
import com.razorpay.RazorpayException;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.PaymentService.entity.OrderDto;
import com.project.PaymentService.entity.OrderResponseDTO;
import com.project.PaymentService.entity.PaymentVerifyReq;
import com.project.PaymentService.service.PaymentService;
import com.razorpay.RazorpayException;


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
    
    @GetMapping("/getorder")
    public ResponseEntity<OrderResponseDTO> getOrder(@RequestParam Long bookingId) {
        try {
            
            OrderResponseDTO orderResponse = paymentService.createOrder(bookingId);
            
            return ResponseEntity.ok(orderResponse);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            
        } catch (RazorpayException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping
    public ResponseEntity<List<PaymentDTO>> getAllPayments() {
        List<PaymentDTO> payments = paymentService.getAllPayments();
        return ResponseEntity.ok(payments);
    }

    
    @GetMapping("/turf/{turfId}")
    public ResponseEntity<List<PaymentDTO>> getPaymentsByTurfId(@PathVariable Long turfId) {
        List<PaymentDTO> payments = paymentService.getPaymentsByTurfId(turfId);
        return ResponseEntity.ok(payments);
    }

    
    @GetMapping("/revenue/total")
    public ResponseEntity<RevenueDTO> getTotalRevenue() {
        RevenueDTO revenue = paymentService.getTotalRevenue();
        return ResponseEntity.ok(revenue);
    }

    
    @GetMapping("/revenue/turf/{turfId}")
    public ResponseEntity<RevenueDTO> getRevenueByTurfId(@PathVariable Long turfId) {
        RevenueDTO revenue = paymentService.getRevenueByTurfId(turfId);
        return ResponseEntity.ok(revenue);
    }

    
    @GetMapping("/stats/weekly")
    public ResponseEntity<List<WeeklyPaymentDTO>> getWeeklyPaymentStats() {
        List<WeeklyPaymentDTO> weeklyStats = paymentService.getWeeklyPaymentStats();
        return ResponseEntity.ok(weeklyStats);
    }
    

}
