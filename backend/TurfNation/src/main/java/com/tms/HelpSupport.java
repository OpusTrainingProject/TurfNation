package com.tms;



import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "help_support")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HelpSupport {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(name = "created_on", nullable = false, updatable = false)
    private LocalDateTime createdOn;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "concern_type", nullable = false)
    private ConcernType concernType;
    
    @Column(columnDefinition = "TEXT", nullable = false)
    private String message;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SupportStatus status = SupportStatus.ACTIVE;
    
    @Column(name = "related_entity_id")
    private Long relatedEntityId; // Booking ID, Turf ID, Payment ID
    
  
    
    public enum ConcernType {
        BOOKING_RELATED, TURF_RELATED, PAYMENT_RELATED, TOURNAMENT_RELATED, OTHER
    }
    
    public enum SupportStatus {
        ACTIVE, RESOLVED, CLOSED
    }
}

