package com.project.RestClient.service;

import com.project.RestClient.entity.OtpVerificationDto;
import com.project.RestClient.entity.SignupDto;
import com.project.RestClient.entity.User;

public interface AuthService {
	String sendOtp(String email);
    boolean verifyOtp(OtpVerificationDto dto);
    String signUp(SignupDto dto);
	void updateProfile(User user);
	void deleteProfile(Long id);
}
