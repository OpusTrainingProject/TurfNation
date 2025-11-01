package com.tms;



import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bookings {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "created_on", nullable = false, updatable = false)
    private LocalDateTime createdOn;
    
    @Column(name = "updated_on")
    private LocalDateTime updatedOn;
    
    @Column(name = "booking_date", nullable = false)
    private LocalDate bookingDate;
    
    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;
    
    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "booking_type")
    private BookingType bookingType = BookingType.REGULAR;
    
    @Column(name = "turf_id", nullable = false)
    private Long turfId;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(name = "tournament_id")
    private Long tournamentId;
    
   
    
    public enum BookingStatus {
        PENDING, CONFIRMED, CANCELLED, COMPLETED
    }
    
    public enum BookingType {
        REGULAR, TOURNAMENT
    }
}

