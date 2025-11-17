package com.review.ServiceImpl;

import java.time.LocalDateTime;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.review.DTO.BookingDTO;
import com.review.DTO.ReviewDTO;
import com.review.Dao.ReviewRepository;
import com.review.Entity.*;
import com.review.Entity.TurfAverageRatingDTO;
import com.review.Entity.UserDTO;
import com.review.Service.ReviewService;

@Service
@Transactional
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private RestTemplate restTemplate;
    
    private static final String USER_SERVICE_URL = "http://USER-SERVICE/users";

    @Override
    public Review createReview(ReviewDTO dto, Long userId) {

//      String bookingServiceUrl = "http://BOOKING-SERVICE/bookings/" + dto.getBookingId();
//      ResponseEntity<BookingDTO> response = restTemplate.getForEntity(bookingServiceUrl, BookingDTO.class);
//
//  if(response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
//    BookingDTO booking = response.getBody();
//    Long turfId = booking.getTurfId();
    
    
    Review review = new Review();
//    review.setBookingId(dto.getBookingId());
    review.setBookingId(1L);
    review.setUserId(userId);
//    review.setTurfId(booking.getTurfId());
    review.setTurfId(1L);
    review.setRating(dto.getRating());
    review.setDescription(dto.getDescription());
    review.setCreatedOn(LocalDateTime.now());

    return reviewRepository.save(review);
//}   else {
//    throw new RuntimeException("Failed to fetch booking details");
//}
}

    @Override
    public List<Review> getReviewsByTurf(Long turfId) {
        return reviewRepository.findByTurfId(turfId);
    }
    
    
    @Override
    public TurfAverageRatingDTO getAverageRatingByTurfId(Long turfId) {
      
        Double averageRating = reviewRepository.getAverageRatingByTurfId(turfId);
        
       
        Long totalReviews = reviewRepository.countByTurfId(turfId);
        
        // If no reviews exist, set default values
        if (averageRating == null) {
            averageRating = 0.0;
        }
        
        // Create and return DTO
        TurfAverageRatingDTO dto = new TurfAverageRatingDTO();
        dto.setTurfId(turfId);
        dto.setAverageRating(averageRating);
        dto.setTotalReviews(totalReviews);
        
        return dto;
    }
    
    
    @Override
    public List<ReviewDTO> getReviewsByTurfIdWithUserNames(Long turfId) {
     
        List<Review> reviews = reviewRepository.findByTurfId(turfId);
        
   
        List<ReviewDTO> reviewDTOs = new ArrayList<>();
        
      
        for (Review review : reviews) {
            
          
            Long userId = review.getUserId();
            
            
            String userServiceUrl = USER_SERVICE_URL + "/" + userId;
            UserDTO user = null;
            
            try {
                // Make HTTP GET request to User Service
                user = restTemplate.getForObject(userServiceUrl, UserDTO.class);
            } catch (Exception e) {
                // If User Service is down or user not found, log error
                System.err.println("Error fetching user " + userId + ": " + e.getMessage());
            }
            
            // Step 6: Create ReviewDTO and populate fields
            ReviewDTO dto = new ReviewDTO();
            dto.setReviewId(review.getReviewId());
            dto.setTurfId(review.getTurfId());
            dto.setUserId(review.getUserId());
            dto.setBookingId(review.getBookingId());
            dto.setCreatedOn(review.getCreatedOn());
            dto.setRating(review.getRating());
            dto.setDescription(review.getDescription());
            
            // Step 7: Set user name (combine firstName + lastName)
            if (user != null) {
                // Combine firstName and lastName to create full name
                String fullName = user.getFirstName();
                
                // Add lastName if it exists
                if (user.getLastName() != null && !user.getLastName().isEmpty()) {
                    fullName = fullName + " " + user.getLastName();
                }
                
                dto.setUserName(fullName);
            } else {
                // If user not found, set default value
                dto.setUserName("Unknown User");
            }
            
         
            reviewDTOs.add(dto);
        }
        
        return reviewDTOs;
    }
    
}

