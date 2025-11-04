package com.project.RestClient.controller;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.RestClient.entity.User;
import com.project.RestClient.entity.UserDto;
import com.project.RestClient.jwt.JwtUtil;
import com.project.RestClient.service.AuthService;

@RestController
@RequestMapping("/auth")
public class Controller {
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired AuthenticationManager authenticationManager;
	
	@Autowired
	private AuthService authService;
	
	@PostMapping("/signin")
	public ResponseEntity<?> signIn( @RequestBody UserDto dto){
		System.out.println("SIGNIN API HIT");

		Authentication auth = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());
		System.out.println(auth);
		Authentication authenticated = authenticationManager.authenticate(auth);
		System.out.println(authenticated);

		String token = jwtUtil.createToken(authenticated);
		System.out.println(token);

		return ResponseEntity.ok(token);
	}
	
	@PostMapping("/signup")
	public ResponseEntity<String> signUp(@RequestBody User user){
		ResponseEntity<String> msg = authService.signUp(user);
		return msg;
	}
	
	@PutMapping("/updateProfile")
	public ResponseEntity<String> updateUserProfile(@RequestBody User user){
		authService.updateProfile(user);
		return ResponseEntity.ok("profile updated successfully");
	}
	
	@DeleteMapping("/deleteProfile/{id}")
	public ResponseEntity<String> deleteUserProfile(@PathVariable Long id){
		authService.deleteProfile(id);
		return ResponseEntity.ok("Profile deleted successfully");
	}
}
