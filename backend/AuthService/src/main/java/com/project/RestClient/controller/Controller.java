package com.project.RestClient.controller;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.project.RestClient.entity.User;
import com.project.RestClient.entity.UserDto;
import com.project.RestClient.jwt.JwtUtil;
import com.project.RestClient.service.AuthService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/auth")
public class Controller {
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired AuthenticationManager authenticationManager;
	
	@Autowired
	private RestTemplate restTemplate;
	
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
	public ResponseEntity<?> signUp(@RequestBody User user){
		String msg = authService.signUp(user);
		return ResponseEntity.ok(msg);
	}
	
	@PostMapping("/afterSignIn")
	public ResponseEntity<?> afterSignIn(HttpServletRequest request){
		Object id= request.getHeader("id");
		Object role= request.getHeader("role");
		return ResponseEntity.ok("id: "+id+" role: "+role);
	}
}
