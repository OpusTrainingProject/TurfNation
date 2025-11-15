package com.review.DTO;

public class BookingDTO {

	 private Long turfId;
	 
	 public BookingDTO() {
		 
	 }

	public BookingDTO(Long turfId) {
		
		this.turfId = turfId;
	}

	public Long getTurfId() {
		return turfId;
	}

	public void setTurfId(Long turfId) {
		this.turfId = turfId;
	}
	 
	 
	
}
