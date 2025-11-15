package com.review.ServiceImpl;

import java.time.LocalDateTime;
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
import com.review.Entity.Review;
import com.review.Service.ReviewService;

@Service
@Transactional
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private RestTemplate restTemplate;

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
}

