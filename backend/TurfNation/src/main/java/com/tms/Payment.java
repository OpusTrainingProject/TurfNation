package com.tms;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "created_on", nullable = false, updatable = false)
    private LocalDateTime createdOn;
    
    @Column(nullable = false)
    private BigDecimal amount;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = false)
    private PaymentMethod paymentMethod;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false)
    private PaymentStatus paymentStatus;
    
    
    @Column(name = "razorpay_order_id")
    private String razorpayOrderId;
    
    @Column(name = "razorpay_payment_id")
    private String razorpayPaymentId;
    
    @Column(name = "razorpay_signature")
    private String razorpaySignature;
    
    @Column(name = "turf_id")
    private Long turfId;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(name = "booking_id")
    private Long bookingId;
    
    @Column(name = "tournament_id")
    private Long tournamentId;
    
    
    
    public enum PaymentMethod {
        CARD, UPI, WALLET
    }
    
    public enum PaymentStatus {
        PENDING, SUCCESS, FAILED, REFUNDED
    }
    
    
}
