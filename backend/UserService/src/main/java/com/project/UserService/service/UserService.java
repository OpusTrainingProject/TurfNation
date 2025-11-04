package com.project.UserService.service;

import java.util.List;

import com.project.UserService.entity.User;

public interface UserService {
	User getUserByUsername(String username);
	List<User> getAllUsers();
	void deleteUser(Long id);
	void updateUser(User user);
	User createUser(User user);
	User getUserById(Long id);
}
