package com.example.entities;

public class BookingStatsDTO {

	 private Long totalBookings;
	
	public BookingStatsDTO() {
		
	}

	public BookingStatsDTO(Long totalBookings) {
	
		this.totalBookings = totalBookings;
	}

	public Long getTotalBookings() {
		return totalBookings;
	}

	public void setTotalBookings(Long totalBookings) {
		this.totalBookings = totalBookings;
	}
	
	
	

}
