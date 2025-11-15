package com.example.DTO;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

import com.example.entities.Booking;
import com.example.enums.Enums.BookingType;
import com.example.enums.Enums.PaymentMethod;

public class BookingCreatedEvent {

    private Long bookingId;
    private Long userId;
    private Long turfId;
    private Long tournamentId;
    private LocalDate bookingDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private BookingType bookingType;
    private PaymentMethod paymentMethod;
    private BigDecimal amount;
    private String userEmail;  // Needed for Notification Service via Kafka


   
    public static BookingCreatedEvent fromBooking(Booking booking, String email) {
        BookingCreatedEvent event = new BookingCreatedEvent();

        event.setBookingId(booking.getBookingId());
        event.setUserId(booking.getUserId());
        event.setTurfId(booking.getTurfId());
        event.setTournamentId(booking.getTournamentId());
        event.setBookingDate(booking.getBookingDate());
        event.setStartTime(booking.getStartTime());
        event.setEndTime(booking.getEndTime());
        event.setBookingType(booking.getBookingType());
        event.setPaymentMethod(booking.getPaymentMethod());
        event.setAmount(booking.getAmount());
        event.setUserEmail(email);  

        return event;
    }



    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getTurfId() {
        return turfId;
    }

    public void setTurfId(Long turfId) {
        this.turfId = turfId;
    }

    public Long getTournamentId() {
        return tournamentId;
    }

    public void setTournamentId(Long tournamentId) {
        this.tournamentId = tournamentId;
    }

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

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}
