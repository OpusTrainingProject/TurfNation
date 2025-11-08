package com.review.DTO;

public class ReviewDTO {


	    private Long bookingId;
	    private Integer rating;
	    private String description;

	    public ReviewDTO() {
	    	
	    }

		public ReviewDTO(Long bookingId, Integer rating, String description) {
			
			this.bookingId = bookingId;
			this.rating = rating;
			this.description = description;
		}

		public Long getBookingId() {
			return bookingId;
		}

		public void setBookingId(Long bookingId) {
			this.bookingId = bookingId;
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
