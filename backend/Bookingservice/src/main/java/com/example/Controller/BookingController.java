package com.example.Controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.DTO.BookingRequestDTO;
import com.example.DTO.MyBookingResponse;
import com.example.DTO.PaymentResponse;
import com.example.Service.BookingService;
import com.example.entities.Booking;

@RestController
@RequestMapping("/booking")
public class BookingController {

	@Autowired
	private BookingService bookService;
	
	@GetMapping("/welcome")
	public String welcome(){
		return "welcome to booking service";
	}


	 @PostMapping("/create")
	    public ResponseEntity<Booking> createBooking(@RequestBody BookingRequestDTO dto) {
	       Booking booking = bookService.createBooking(dto);
	        return ResponseEntity.ok(booking);
	    }
	
	 @GetMapping("user/{userId}")
	  public ResponseEntity<List<Booking>>getBookingByUser(@PathVariable Long userId){
		   List<Booking> bookings = bookService.getBookingsByUser(userId);
	        return ResponseEntity.ok(bookings);
	 }
	 
	  @GetMapping("/{bookingId}")
	    public ResponseEntity<Booking> getBookingById(@PathVariable Long bookingId) {
	        Booking booking = bookService.getBookingById(bookingId);
	        return ResponseEntity.ok(booking);
	    }
	  
	  
	  @PatchMapping("/{bookingId}/cancel")
	    public ResponseEntity<Booking> cancelBooking(@PathVariable Long bookingId) {
	        Booking booking = bookService.cancelBooking(bookingId);
	        return ResponseEntity.ok(booking);
	    }
	
	  
	  @GetMapping("/turf/{turfId}")
	    public ResponseEntity<List<Booking>> getBookingsByTurf(@PathVariable Long turfId) {
	        List<Booking> bookings = bookService.getBookingsByTurfId(turfId);
	        if (bookings.isEmpty()) {
	            return ResponseEntity.noContent().build();
	        }
	        return ResponseEntity.ok(bookings);
	    }
	  
	  @PostMapping("/payment-status")
	    public ResponseEntity<Booking> updatePaymentStatus(@RequestBody PaymentResponse paymentResponse) {
	        Booking updatedBooking = bookService.updateBookingPaymentStatus(paymentResponse);
	        return ResponseEntity.ok(updatedBooking);
	    }
	  
	  @GetMapping("/mybookings/{userId}")
	  public ResponseEntity<List<MyBookingResponse>> getMyBookings(@PathVariable Long userId) {
	      List<MyBookingResponse> response = bookService.getMyBookings(userId);
	      if (response.isEmpty()) {
	          return ResponseEntity.noContent().build();
	      }
	      return ResponseEntity.ok(response);
	  }

	  
	  
	  
	  
	  
	
	
	
}
