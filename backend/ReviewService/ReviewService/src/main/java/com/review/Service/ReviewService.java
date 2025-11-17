package com.review.Service;

import java.util.List;

import com.review.DTO.ReviewDTO;
import com.review.Entity.Review;
import com.review.Entity.TurfAverageRatingDTO;

public interface ReviewService {
    Review createReview(ReviewDTO reviewDTO, Long userId);
    List<Review> getReviewsByTurf(Long turfId);
    
    TurfAverageRatingDTO getAverageRatingByTurfId(Long turfId);

    List<ReviewDTO> getReviewsByTurfIdWithUserNames(Long turfId);
}
