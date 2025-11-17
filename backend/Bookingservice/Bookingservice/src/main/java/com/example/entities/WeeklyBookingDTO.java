package com.example.entities;

public class WeeklyBookingDTO {

	private String week;      // Date in DD/MM format (e.g., "15/11")
    private Long bookings;
	
	public WeeklyBookingDTO() {
	
	}

	public WeeklyBookingDTO(String week, Long bookings) {
		
		this.week = week;
		this.bookings = bookings;
	}

	public String getWeek() {
		return week;
	}

	public void setWeek(String week) {
		this.week = week;
	}

	public Long getBookings() {
		return bookings;
	}

	public void setBookings(Long bookings) {
		this.bookings = bookings;
	}

	
	
}
