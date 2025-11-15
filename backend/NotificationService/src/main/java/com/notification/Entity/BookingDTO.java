package com.notification.Entity;

public class BookingDTO {
	

    private Long turfId;
    private String date;
    private String time;
    
    public BookingDTO() {
    	
    }

	public BookingDTO(Long turfId, String date, String time) {
		
		this.turfId = turfId;
		this.date = date;
		this.time = time;
	}

	public Long getTurfId() {
		return turfId;
	}

	public void setTurfId(Long turfId) {
		this.turfId = turfId;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}


}
