package com.example.TurfServiceImpl;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.DTO.BookingCreatedEvent;
import com.example.DTO.BookingCreatedEvent.NotificationType;
import com.example.DTO.BookingRequestDTO;
import com.example.DTO.MyBookingResponse;
import com.example.DTO.PaymentRequest;
import com.example.DTO.PaymentResponse;
import com.example.DTO.TurfResponse;
import com.example.Service.BookingService;
import com.example.Turfrepository.BookingRepository;
import com.example.entities.Booking;
import com.example.entities.BookingStatsDTO;
import com.example.entities.WeeklyBookingDTO;
import com.example.enums.Enums.PaymentStatus;

@Service
public class BookingServiceImpl implements BookingService {

	@Autowired
	private final BookingEventPublisher bookingEventPublisher;

	@Autowired
	private BookingRepository repo;
	
	
	@Autowired
	private RestTemplate restTemplate;

	
	@Autowired
	private UserClient userClient;
	
	
	@Autowired
	private PaymentClient paymentClient;

	
	
	public BookingServiceImpl(BookingRepository repo, BookingEventPublisher bookingEventPublisher) {
	    this.repo = repo;
	    this.bookingEventPublisher = bookingEventPublisher;
	}


	@Override
	public Booking createBooking(BookingRequestDTO dto) {
		// TODO Auto-generated method stub
		
        List<Booking> conflicts = repo.findOverlappingBookings(
                dto.getTurfId(),
                dto.getBookingDate(),
                dto.getStartTime(),
                dto.getEndTime()
        );

        if (!conflicts.isEmpty()) {
            throw new RuntimeException("Time slot already booked for this turf.");
        }	
		
		
	    Booking booking = new Booking();
	    booking.setStartTime(dto.getStartTime());
        booking.setEndTime(dto.getEndTime());
        booking.setBookingStatus(Booking.BookingStatus.PENDING);  // Always PENDING initially
        booking.setBookingType(dto.getBookingType());
        booking.setPaymentMethod(dto.getPaymentMethod());
        booking.setTurfId(dto.getTurfId());
        booking.setUserId(dto.getUserId());
        booking.setTournamentId(dto.getTournamentId());
        booking.setAmount(dto.getAmount());
        booking.setBookingDate(LocalDate.now()); // Current date
        
        Booking savedBooking=repo.save(booking);
        
        //initiate request to payment service
        PaymentRequest paymentRequest = new PaymentRequest();
        paymentRequest.setBookingId(savedBooking.getBookingId());
        paymentRequest.setAmount(savedBooking.getAmount());
        paymentRequest.setTurfId(booking.getTurfId());
        paymentRequest.setUserId(booking.getUserId());
       try {
    	   paymentClient.initiatePayment(paymentRequest);
       } 
        catch(Exception e) {
        	 System.err.println("❌ Payment initiation failed: " + e.getMessage());
             savedBooking.setBookingStatus(Booking.BookingStatus.CANCELLED);
             repo.save(savedBooking);
        }
        
        return savedBooking;
	}

	@Override
	public List<Booking> getBookingsByUser(Long userId) {
		// TODO Auto-generated method stub
		return repo.findByUserId(userId);
	}

	@Override
	public Booking getBookingById(Long bookingId) {
		// TODO Auto-generated method stub
		 return repo.findById(bookingId)
	                .orElseThrow(() -> new RuntimeException("Booking not found"));
	}

	@Override
	public Booking cancelBooking(Long bookingId) {
		// TODO Auto-generated method stub
		 Booking booking = getBookingById(bookingId);
	        booking.setBookingStatus(Booking.BookingStatus.CANCELLED);
	        return repo.save(booking);
	}


	@Override
	public List<Booking> getBookingsByTurfId(Long turfId) {
		// TODO Auto-generated method stub
		return repo.findByTurfId(turfId);
	}


	@Override
	public Booking updateBookingPaymentStatus(PaymentResponse paymentResponse) {
		// TODO Auto-generated method stub
		 Booking booking = repo.findById(paymentResponse.getBookingId())
		            .orElseThrow(() -> new RuntimeException("Booking not found"));

		    // Update payment method and status
		    booking.setPaymentMethod(paymentResponse.getPaymentMethod());
		   
		    
		    
		    
		    if (paymentResponse.getPaymentStatus() == PaymentStatus.SUCCESS) {
		        booking.setBookingStatus(Booking.BookingStatus.CONFIRMED);

		        String email = userClient.getUserEmail(booking.getUserId());
		        
		        BookingCreatedEvent event = new BookingCreatedEvent();
		        event.setNotificationType(NotificationType.BOOKING_CONFIRMATION);
		        event.setBookingDetails(booking.getBookingId());
		        event.setEmail(email); //setting email after communicating with user service

		        bookingEventPublisher.publishBookingCreatedEvent(event);


		    } else {
		        booking.setBookingStatus(Booking.BookingStatus.CANCELLED);
		    }

		    return repo.save(booking);
	}

	@Override
	public List<MyBookingResponse> getMyBookings(Long userId) {
	    List<Booking> bookings = repo.findByUserId(userId);
	    List<MyBookingResponse> responses = new ArrayList<>();

	    for (Booking booking : bookings) {
	        // Construct Turf Service URL
	        String turfServiceUrl = "http://TURF-SERVICE/turf/" + booking.getTurfId();

	        // Call Turf Service
	        TurfResponse turf = restTemplate.getForObject(turfServiceUrl, TurfResponse.class);

	        // Combine Booking + Turf Data
	        MyBookingResponse dto = new MyBookingResponse();
	        dto.setBookingId(booking.getBookingId());
	        dto.setBookingDate(booking.getBookingDate());
	        dto.setStartTime(booking.getStartTime());
	        dto.setEndTime(booking.getEndTime());
	        dto.setBookingStatus(booking.getBookingStatus());

	        if (turf != null) {
	            dto.setTurfName(turf.getTurfName());
	            dto.setArea(turf.getArea());
	            dto.setPrice(turf.getPrice());
	        }

	        responses.add(dto);
	    }

	    return responses;
	}


	
	 @Override
	    public BookingStatsDTO getBookingStats() {
	        // Count total bookings from database
	        Long totalBookings = repo.count();
	        
	        // Create and return stats DTO
	        BookingStatsDTO stats = new BookingStatsDTO();
	        stats.setTotalBookings(totalBookings);
	        
	        return stats;
	    }
	    
	    @Override
	    public List<WeeklyBookingDTO> getWeeklyBookingStats() {
	        // Calculate date 8 weeks (56 days) ago from today
	        LocalDate eightWeeksAgo = LocalDate.now().minusDays(56);
	        
	        // Get bookings grouped by bookingDate from repository
	        List<Object[]> results = repo.getWeeklyBookingStats(eightWeeksAgo);
	        
	        // Convert results to DTO list
	        List<WeeklyBookingDTO> weeklyStats = new ArrayList<>();
	        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM");
	        
	        // Loop through each result row
	        for (Object[] result : results) {
	            // result[0] = bookingDate (LocalDate), result[1] = count (Long)
	            LocalDate date = (LocalDate) result[0];
	            Long count = (Long) result[1];
	            
	            // Format date as DD/MM (e.g., "15/11")
	            String formattedDate = date.format(formatter);
	            
	            // Create DTO and add to list
	            WeeklyBookingDTO dto = new WeeklyBookingDTO();
	            dto.setWeek(formattedDate);
	            dto.setBookings(count);
	            weeklyStats.add(dto);
	        }
	        
	        return weeklyStats;
	    }
	
	
	
	
	
}
