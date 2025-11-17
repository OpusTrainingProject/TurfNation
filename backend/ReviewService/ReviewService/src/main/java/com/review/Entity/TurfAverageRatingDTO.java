package com.review.Entity;

public class TurfAverageRatingDTO {

	
	    private Long turfId;
	    private Double averageRating;    // Average rating (e.g., 4.5)
	    private Long totalReviews;   
	
	public TurfAverageRatingDTO() {
		
	}

	public TurfAverageRatingDTO(Long turfId, Double averageRating, Long totalReviews) {
	
		this.turfId = turfId;
		this.averageRating = averageRating;
		this.totalReviews = totalReviews;
	}

	public Long getTurfId() {
		return turfId;
	}

	public void setTurfId(Long turfId) {
		this.turfId = turfId;
	}

	public Double getAverageRating() {
		return averageRating;
	}

	public void setAverageRating(Double averageRating) {
		this.averageRating = averageRating;
	}

	public Long getTotalReviews() {
		return totalReviews;
	}

	public void setTotalReviews(Long totalReviews) {
		this.totalReviews = totalReviews;
	}
	
	

}
