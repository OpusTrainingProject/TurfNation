package com.review.Service;

import java.util.List;

import com.review.DTO.ReviewDTO;
import com.review.Entity.Review;

public interface ReviewService {
    Review createReview(ReviewDTO reviewDTO, Long userId);
    List<Review> getReviewsByTurf(Long turfId);
}
