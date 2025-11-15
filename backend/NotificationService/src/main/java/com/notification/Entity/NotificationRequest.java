package com.notification.Entity;

public class NotificationRequest{

private String toEmail;
  private NotificationType notificationType;
  private String email; // for OTP
  private String turfName; // for booking/tournament
  private String bookingDetails; // optional
  private String tournamentDetails; // optional
  private String otp; // for OTP
  
  public NotificationRequest() {
	  
  }

public NotificationRequest(String toEmail, NotificationType notificationType, String email, String turfName,
		String bookingDetails, String tournamentDetails, String otp) {
	
	this.toEmail = toEmail;
	this.notificationType = notificationType;
	this.email = email;
	this.turfName = turfName;
	this.bookingDetails = bookingDetails;
	this.tournamentDetails = tournamentDetails;
	this.otp = otp;
}

public String getToEmail() {
	return toEmail;
}

public void setToEmail(String toEmail) {
	this.toEmail = toEmail;
}

public String getEmail() {
	return email;
}

public void setEmail(String email) {
	this.email = email;
}

public String getTurfName() {
	return turfName;
}

public void setTurfName(String turfName) {
	this.turfName = turfName;
}

public String getBookingDetails() {
	return bookingDetails;
}

public void setBookingDetails(String bookingDetails) {
	this.bookingDetails = bookingDetails;
}

public String getTournamentDetails() {
	return tournamentDetails;
}

public void setTournamentDetails(String tournamentDetails) {
	this.tournamentDetails = tournamentDetails;
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

@Override
public String toString() {
	return "NotificationRequest [toEmail=" + toEmail + ", notificationType=" + notificationType + ", email=" + email
			+ ", turfName=" + turfName + ", bookingDetails=" + bookingDetails + ", tournamentDetails="
			+ tournamentDetails + ", otp=" + otp + "]";
}



  }
