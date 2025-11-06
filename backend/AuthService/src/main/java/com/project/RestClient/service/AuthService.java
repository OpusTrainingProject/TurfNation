package com.project.RestClient.service;

import org.springframework.http.ResponseEntity;

import com.project.RestClient.entity.User;
import com.project.RestClient.entity.UserOtpDto;

public interface AuthService {
	ResponseEntity<String> signUp(UserOtpDto dto);
	void sendOtpReq(String email);
	void updateProfile(User user);
	void deleteProfile(Long id);
}
