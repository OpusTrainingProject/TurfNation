package com.review.Entity;

import java.time.LocalDateTime;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "reviews")
public class Review {
	    
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long reviewId;
	    
	    @Column(name = "turf_id", nullable = false)
	    private Long turfId;
	    
	    @Column(name = "user_id", nullable = false)
	    private Long userId;
	    
	    @Column(name = "booking_id")
	    private Long bookingId;
	    
	    @Column(name = "created_on", nullable = false, updatable = false)
	    private LocalDateTime createdOn;
	    
	    @Column(nullable = false)
	    private Integer rating; // 1-5
	    
	    @Column(columnDefinition = "TEXT")
	    private String description;
	    
	    
	    public Review() {
	    	
	    }


		public Review(Long id, Long turfId, Long userId, Long bookingId, LocalDateTime createdOn, Integer rating,
				String description) {
			
			this.reviewId = id;
			this.turfId = turfId;
			this.userId = userId;
			this.bookingId = bookingId;
			this.createdOn = createdOn;
			this.rating = rating;
			this.description = description;
		}


		public Long getReviewId() {
			return reviewId;
		}


		public void setReviewId(Long id) {
			this.reviewId = id;
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


		@Override
		public String toString() {
			return "Review [id=" + reviewId + ", turfId=" + turfId + ", userId=" + userId + ", bookingId=" + bookingId
					+ ", createdOn=" + createdOn + ", rating=" + rating + ", description=" + description + "]";
		}
	    

}
