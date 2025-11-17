package com.review.DTO;

import java.time.LocalDateTime;

public class ReviewDTO {

	    private Long reviewId;
	    private Long turfId;
	    private Long userId;
	    private String userName;        // Full name (firstName + lastName)
	    private Long bookingId;
	    private LocalDateTime createdOn;
	    private Integer rating;
	    private String description;
	
	public ReviewDTO() {
		
	}

	public ReviewDTO(Long reviewId, Long turfId, Long userId, String userName, Long bookingId, LocalDateTime createdOn,
			Integer rating, String description) {
		
		this.reviewId = reviewId;
		this.turfId = turfId;
		this.userId = userId;
		this.userName = userName;
		this.bookingId = bookingId;
		this.createdOn = createdOn;
		this.rating = rating;
		this.description = description;
	}

	public Long getReviewId() {
		return reviewId;
	}

	public void setReviewId(Long reviewId) {
		this.reviewId = reviewId;
	}

	public Long getTurfId() {
		return turfId;
	}

	public void setTurfId(Long turfId) {
		this.turfId = turfId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Long getBookingId() {
		return bookingId;
	}

	public void setBookingId(Long bookingId) {
		this.bookingId = bookingId;
	}

	public LocalDateTime getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(LocalDateTime createdOn) {
		this.createdOn = createdOn;
	}

	public Integer getRating() {
		return rating;
	}

	public void setRating(Integer rating) {
		this.rating = rating;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}



	
	
	
}
