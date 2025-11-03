package com.project.RestClient.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.project.RestClient.dao.AuthDao;
import com.project.RestClient.entity.User;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
	
	@Autowired
	private AuthDao authDao;
	
	@Autowired
	private RestTemplate restTemplate;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		System.out.println("Testing");
		System.out.println("Email = " + email);
		User dbUser = authDao.findByEmail(email)
			.orElseThrow(() -> new UsernameNotFoundException("No user exists with email: " + email));
		return dbUser;
	}
	
}
