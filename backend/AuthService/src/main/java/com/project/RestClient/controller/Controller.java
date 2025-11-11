package com.project.RestClient.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.RestClient.entity.OtpVerificationDto;
import com.project.RestClient.entity.SignupDto;
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
	public ResponseEntity<Map<String, String>> signIn( @RequestBody UserDto dto){
		System.out.println("SIGNIN API HIT");

		Authentication auth = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());
		System.out.println(auth);
		Authentication authenticated = authenticationManager.authenticate(auth);
		System.out.println(authenticated);

		String token = jwtUtil.createToken(authenticated);
		System.out.println(token);
		
		Map<String, String> response = new HashMap<>();
	    response.put("token", token);
	    return ResponseEntity.ok(response);
	}
	
	@GetMapping("/send-otp/{email}")
	public ResponseEntity<String> sendOtp(@PathVariable("email") String dto) {
	    String response = authService.sendOtp(dto);
	    return ResponseEntity.ok(response);
	}

    // 2️⃣ Verify OTP
    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestBody OtpVerificationDto dto) {
        boolean verified = authService.verifyOtp(dto);
        if (verified) {
            return ResponseEntity.ok("OTP verified successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired OTP");
        }
    }

    // 3️⃣ Signup user
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody SignupDto dto) {
    	System.out.println(dto);
        String msg = authService.signUp(dto);
        if (msg.equals("Signup successful!")) {
            return ResponseEntity.ok(msg);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(msg);
        }
    }
	
//	@GetMapping("/verify/{email}")
//	public void verifyEmail(@PathVariable("email") String email){
//		authService.sendOtpReq(email);
//	}
//	
//	@PostMapping("/signup")
//	public ResponseEntity<String> signUp(@RequestBody UserOtpDto dto){
//		ResponseEntity<String> msg = authService.signUp(dto);
//		return msg;
//	}
	
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
