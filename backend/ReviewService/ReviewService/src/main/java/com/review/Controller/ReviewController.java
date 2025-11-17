package com.review.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.review.DTO.ReviewDTO;
import com.review.Entity.Review;
import com.review.Entity.TurfAverageRatingDTO;
import com.review.Service.ReviewService;

@RestController
@RequestMapping("/review")

public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody ReviewDTO reviewDTO,
                                               @RequestHeader("user-id") Long userId) {
        Review review = reviewService.createReview(reviewDTO, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(review);
    }

    @GetMapping("/turf/{turfId}")
    public ResponseEntity<List<Review>> getReviewsByTurf(@PathVariable Long turfId) {
        return ResponseEntity.ok(reviewService.getReviewsByTurf(turfId));
    }
    
    @GetMapping("/turf/{turfId}/average-rating")
    public ResponseEntity<TurfAverageRatingDTO> getAverageRating(@PathVariable Long turfId) {
        TurfAverageRatingDTO averageRating = reviewService.getAverageRatingByTurfId(turfId);
        return ResponseEntity.ok(averageRating);
    }
    
   
    @GetMapping("/turf/{turfId}/with-users")
    public ResponseEntity<List<ReviewDTO>> getReviewsWithUserNames(@PathVariable Long turfId) {
        List<ReviewDTO> reviews = reviewService.getReviewsByTurfIdWithUserNames(turfId);
        return ResponseEntity.ok(reviews);
    }
    
}
