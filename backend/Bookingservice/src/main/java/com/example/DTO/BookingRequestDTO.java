package com.example.DTO;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

import com.example.entities.Booking.BookingStatus;
import com.example.enums.Enums.BookingType;
import com.example.enums.Enums.PaymentMethod;


public class BookingRequestDTO {
    private LocalDate bookingDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private BookingStatus status = BookingStatus.PENDING;
    private BookingType bookingType;
    private PaymentMethod paymentMethod;
    
    private Long turfId;
    private Long userId;
    private Long tournamentId; // optional, can be null
    private BigDecimal amount;

    // Default constructor
    public BookingRequestDTO() {}

    // Parameterized constructor
    public BookingRequestDTO(LocalDate bookingDate,LocalTime startTime, LocalTime endTime,
                             BookingType bookingType, PaymentMethod paymentMethod,
                             Long turfId, Long userId, Long tournamentId,
                             BigDecimal amount) {
        this.bookingDate = bookingDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = BookingStatus.PENDING;
        this.bookingType = bookingType;
        this.paymentMethod = paymentMethod;
        this.turfId = turfId;
        this.userId = userId;
        this.tournamentId = tournamentId;
        this.amount = amount;
    }

    // Getters and Setters
    
    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }
    
    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public BookingType getBookingType() {
        return bookingType;
    }

    public void setBookingType(BookingType bookingType) {
        this.bookingType = bookingType;
    }
    
    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Long getTurfId() {
        return turfId;
    }

    public void setTurfId(Long turfId) {
        this.turfId = turfId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getTournamentId() {
        return tournamentId;
    }

    public void setTournamentId(Long tournamentId) {
        this.tournamentId = tournamentId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}
