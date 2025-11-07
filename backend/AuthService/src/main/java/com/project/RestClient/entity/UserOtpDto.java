package com.project.RestClient.entity;

import com.project.RestClient.entity.User.UserRole;

public class UserOtpDto {
	private String firstname;
	private String lastname;
	private String email;
	private String phone;
	private String password;
	private UserRole userRole;
	String otp;


	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
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
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public UserRole getUserRole() {
		return userRole;
	}
	public void setUserRole(UserRole userRole) {
		this.userRole = userRole;
	}
	public String getOtp() {
		return otp;
	}
	public void setOtp(String otp) {
		this.otp = otp;
	}
	@Override
	public String toString() {
		return "UserOtpDto [firstname=" + firstname + ", lastname=" + lastname + ", email=" + email + ", phone=" + phone
				+ ", password=" + password + ", userRole=" + userRole + ", otp=" + otp + "]";
	}


}
