package com.project.UserService.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.UserService.dao.UserDao;
import com.project.UserService.entity.User;
import com.project.UserService.exception.UserAlreadyExistsException;
import com.project.UserService.exception.UserNotFoundException;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserDao userDao;
	
	@Override
	public User getUserByUsername(String username) {
	    User user = userDao.findByEmail(username)
	        .orElseThrow(() -> new UserNotFoundException("No user with username " + username + " exists"));
	    return user;
	}


	@Override
	public List<User> getAllUsers() {
		return userDao.findAll();
	}

	@Override
	public void deleteUser(Long id) {
		if (!userDao.existsById(id)) {
			throw new UserNotFoundException("No user found with id " + id);
		}
		userDao.deleteById(id);
	}

	@Override
	public void updateUser(User user) {
		User existingUser = userDao.findById(user.getId())
				.orElseThrow(() -> new UserNotFoundException("No user found with id " + user.getId()));

		existingUser.setFirstname(user.getFirstname());
		existingUser.setLastname(user.getLastname());
		existingUser.setEmail(user.getEmail());
		existingUser.setPassword(user.getPassword());
		existingUser.setUserRole(user.getUserRole());
		existingUser.setPhone(user.getPhone());

	}

	@Override
	public User createUser(User user) {
		if (userDao.findByEmail(user.getEmail()).isPresent()) {
			throw new UserAlreadyExistsException("User already exists with email: " + user.getEmail());
		}
		return userDao.save(user);
	}


	@Override
	public User getUserById(Long id) {
		
		return userDao.findById(id).orElseThrow(()-> new UserNotFoundException("No user found with id "+id));
	}
	
}
