package com.project.RestClient.service;

import org.springframework.http.ResponseEntity;

import com.project.RestClient.entity.User;

public interface AuthService {
	ResponseEntity<String> signUp(User user);
	void updateProfile(User user);
	void deleteProfile(Long id);
}
