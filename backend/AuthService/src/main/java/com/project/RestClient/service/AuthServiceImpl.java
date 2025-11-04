package com.project.RestClient.service;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.project.RestClient.entity.User;


@Service
public class AuthServiceImpl implements AuthService{
	
	@Autowired
	private RestTemplate restTemplate;
	@Autowired
	private PasswordEncoder encoder;
	
	@Override
	public ResponseEntity<String> signUp(User user) {
		// TODO Auto-generated method stub
		user.setPassword(encoder.encode(user.getPassword()));
		String url="http://UserService/user/create";
		ResponseEntity<String> success= restTemplate.postForEntity(url, user, String.class);
		return success;
	}

	@Override
	public void updateProfile(User user) {
		// TODO Auto-generated method stub
		user.setPassword(encoder.encode(user.getPassword()));
		String url="http://UserService/user/update";
		restTemplate.put(url, user);
		
	}

	@Override
	public void deleteProfile(Long id) {
		// TODO Auto-generated method stub
		String url="http://UserService/user/delete/"+id;
		restTemplate.delete(url);
	}

}
