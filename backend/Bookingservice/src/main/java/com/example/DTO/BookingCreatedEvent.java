package com.example.DTO;

public class BookingCreatedEvent {

//    private Long bookingId;
//    private Long userId;
//    private Long turfId;
//    private Long tournamentId;
//    private LocalDate bookingDate;
//    private LocalTime startTime;
//    private LocalTime endTime;
//    private BookingType bookingType;
//    private PaymentMethod paymentMethod;
//    private BigDecimal amount;
//    private String userEmail;  // Needed for Notification Service via Kafka
	private NotificationType notificationType;
	private String email; // for OTP
	private String turfName; // for booking/tournament
	private Long bookingDetails; // optional
	private String tournamentDetails; // optional
	private String otp;
	public NotificationType getNotificationType() {
		return notificationType;
	}
	public void setNotificationType(NotificationType notificationType) {
		this.notificationType = notificationType;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getTurfName() {
		return turfName;
	}
	public void setTurfName(String turfName) {
		this.turfName = turfName;
	}

	public Long getBookingDetails() {
		return bookingDetails;
	}
	public void setBookingDetails(Long bookingDetails) {
		this.bookingDetails = bookingDetails;
	}
	public String getTournamentDetails() {
		return tournamentDetails;
	}
	public void setTournamentDetails(String tournamentDetails) {
		this.tournamentDetails = tournamentDetails;
	}
	public String getOtp() {
		return otp;
	}
	public void setOtp(String otp) {
		this.otp = otp;
	} // for OTP


   
//    public static BookingCreatedEvent fromBooking(Booking booking, String email) {
//        BookingCreatedEvent event = new BookingCreatedEvent();
//
//        event.setBookingId(booking.getBookingId());
//        event.setUserId(booking.getUserId());
//        event.setTurfId(booking.getTurfId());
//        event.setTournamentId(booking.getTournamentId());
//        event.setBookingDate(booking.getBookingDate());
//        event.setStartTime(booking.getStartTime());
//        event.setEndTime(booking.getEndTime());
//        event.setBookingType(booking.getBookingType());
//        event.setPaymentMethod(booking.getPaymentMethod());
//        event.setAmount(booking.getAmount());
//        event.setUserEmail(email);  
//
//        return event;
//    }
//
//
//
//    public Long getBookingId() {
//        return bookingId;
//    }
//
//    public void setBookingId(Long bookingId) {
//        this.bookingId = bookingId;
//    }
//
//    public Long getUserId() {
//        return userId;
//    }
//
//    public void setUserId(Long userId) {
//        this.userId = userId;
//    }
//
//    public Long getTurfId() {
//        return turfId;
//    }
//
//    public void setTurfId(Long turfId) {
//        this.turfId = turfId;
//    }
//
//    public Long getTournamentId() {
//        return tournamentId;
//    }
//
//    public void setTournamentId(Long tournamentId) {
//        this.tournamentId = tournamentId;
//    }
//
//    public LocalDate getBookingDate() {
//        return bookingDate;
//    }
//
//    public void setBookingDate(LocalDate bookingDate) {
//        this.bookingDate = bookingDate;
//    }
//
//    public LocalTime getStartTime() {
//        return startTime;
//    }
//
//    public void setStartTime(LocalTime startTime) {
//        this.startTime = startTime;
//    }
//
//    public LocalTime getEndTime() {
//        return endTime;
//    }
//
//    public void setEndTime(LocalTime endTime) {
//        this.endTime = endTime;
//    }
//
//    public BookingType getBookingType() {
//        return bookingType;
//    }
//
//    public void setBookingType(BookingType bookingType) {
//        this.bookingType = bookingType;
//    }
//
//    public PaymentMethod getPaymentMethod() {
//        return paymentMethod;
//    }
//
//    public void setPaymentMethod(PaymentMethod paymentMethod) {
//        this.paymentMethod = paymentMethod;
//    }
//
//    public BigDecimal getAmount() {
//        return amount;
//    }
//
//    public void setAmount(BigDecimal amount) {
//        this.amount = amount;
//    }
//
//    public String getUserEmail() {
//        return userEmail;
//    }
//
//    public void setUserEmail(String userEmail) {
//        this.userEmail = userEmail;
//    }
//}
	public enum NotificationType{
    	OTP, BOOKING_CONFIRMATION
    }
}
