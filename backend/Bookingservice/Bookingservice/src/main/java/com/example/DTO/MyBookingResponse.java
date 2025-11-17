package com.example.DTO;



import java.time.LocalDate;
import java.time.LocalTime;

import com.example.entities.Booking.BookingStatus;

public class MyBookingResponse {

    private Long bookingId;
    private String turfName;
    private String area;
    private double price;
    private LocalDate bookingDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private BookingStatus bookingStatus;
    
    
    public MyBookingResponse() {
    	
    }
     
    
	public MyBookingResponse(Long bookingId, String turfName, String area, double price, LocalDate bookingDate,
			LocalTime startTime, LocalTime endTime, BookingStatus bookingStatus) {
		super();
		this.bookingId = bookingId;
		this.turfName = turfName;
		this.area = area;
		this.price = price;
		this.bookingDate = bookingDate;
		this.startTime = startTime;
		this.endTime = endTime;
		this.bookingStatus = bookingStatus;
	}


	public Long getBookingId() {
		return bookingId;
	}


	public void setBookingId(Long bookingId) {
		this.bookingId = bookingId;
	}


	public String getTurfName() {
		return turfName;
	}


	public void setTurfName(String turfName) {
		this.turfName = turfName;
	}


	public String getArea() {
		return area;
	}


	public void setArea(String area) {
		this.area = area;
	}


	public double getPrice() {
		return price;
	}


	public void setPrice(double price) {
		this.price = price;
	}


	public LocalDate getBookingDate() {
		return bookingDate;
	}


	public void setBookingDate(LocalDate bookingDate) {
		this.bookingDate = bookingDate;
	}


	public LocalTime getStartTime() {
		return startTime;
	}


	public void setStartTime(LocalTime startTime) {
		this.startTime = startTime;
	}


	public LocalTime getEndTime() {
		return endTime;
	}


	public void setEndTime(LocalTime endTime) {
		this.endTime = endTime;
	}


	public BookingStatus getBookingStatus() {
		return bookingStatus;
	}


	public void setBookingStatus(BookingStatus bookingStatus) {
		this.bookingStatus = bookingStatus;
	}
    
    
    
   
}
