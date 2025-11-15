package com.example.Service;

import java.util.List;

import com.example.DTO.BookingRequestDTO;
import com.example.DTO.MyBookingResponse;
import com.example.DTO.PaymentResponse;
import com.example.entities.Booking;

public interface BookingService {


	Booking createBooking(BookingRequestDTO dto);

	List<Booking> getBookingsByUser(Long userId);

	Booking getBookingById(Long bookingId);

	Booking cancelBooking(Long bookingId);

	List<Booking> getBookingsByTurfId(Long turfId);

	Booking updateBookingPaymentStatus(PaymentResponse paymentResponse);
	
	List<MyBookingResponse> getMyBookings(Long userId);

	
}
