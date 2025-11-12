package com.project.RestClient.entity;


public class OtpVerificationDto {
    private String email;
    private String otp;
    private NotificationType notificationType;
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getOtp() {
		return otp;
	}
	public void setOtp(String otp) {
		this.otp = otp;
	}
    public NotificationType getNotificationType() {
		return notificationType;
	}
	public void setNotificationType(NotificationType notificationType) {
		this.notificationType = notificationType;
	}
	public enum NotificationType{
    	OTP, BOOKING_CONFIRMATION
    }
}
