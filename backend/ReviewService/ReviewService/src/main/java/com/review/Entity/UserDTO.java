package com.review.Entity;

import java.time.LocalDateTime;

public class UserDTO {
	
	    private Long userId;
	    private String firstName;      // Changed from 'name'
	    private String lastName;       // New field
	    private String email;
	    private String phone;
	    private String userRole;       // USER or ADMIN
	    private LocalDateTime createdOn;

	public UserDTO() {
		
	}

	public UserDTO(Long userId, String firstName, String lastName, String email, String phone, String userRole,
			LocalDateTime createdOn) {
		
		this.userId = userId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.phone = phone;
		this.userRole = userRole;
		this.createdOn = createdOn;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getUserRole() {
		return userRole;
	}

	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}

	public LocalDateTime getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(LocalDateTime createdOn) {
		this.createdOn = createdOn;
	}
	
	

}
