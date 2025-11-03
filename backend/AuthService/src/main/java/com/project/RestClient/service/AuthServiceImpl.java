package com.project.RestClient.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.RestClient.dao.AuthDao;
import com.project.RestClient.entity.User;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AuthServiceImpl implements AuthService{
	
	@Autowired
	private PasswordEncoder encoder;
	@Autowired
	private AuthDao authDao;
	
	@Override
	public String signUp(User user) {
		// TODO Auto-generated method stub
		user.setPassword(encoder.encode(user.getPassword()));
		authDao.save(user);
		return "user registered";
	}

}
