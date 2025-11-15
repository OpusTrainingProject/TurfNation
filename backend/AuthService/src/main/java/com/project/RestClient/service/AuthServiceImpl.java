package com.project.RestClient.service;

import java.time.Duration; 
import java.util.Random;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.RestClient.entity.OtpVerificationDto;
import com.project.RestClient.entity.SignupDto;
import com.project.RestClient.entity.User;
import com.project.RestClient.entity.OtpVerificationDto.NotificationType;


@Service
public class AuthServiceImpl implements AuthService{

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private RedisTemplate<String, String> redisTemplate;
	
	@Autowired
	private KafkaTemplate<String, Object> kafkaTemplate;


	  @Override
	    public String sendOtp(String email) {
			Random random=new Random();
			StringBuilder captcha = new StringBuilder();
	        for (int i = 0; i < 6; i++) { 
	            char letter = (char) ('A' + random.nextInt(26));
	            captcha.append(letter);
	        }
	        String finalCaptcha=captcha.toString().trim();
	        redisTemplate.opsForValue().set(email.trim(), finalCaptcha, 5, TimeUnit.MINUTES);
	        
			OtpVerificationDto otpDto=new OtpVerificationDto();
			otpDto.setEmail(email);
			otpDto.setOtp(captcha.toString());
			otpDto.setNotificationType(NotificationType.OTP);
			kafkaTemplate.send("notification-topic", otpDto);
	        return "OTP sent successfully to " + email;
	    }

	    @Override
	    public boolean verifyOtp(OtpVerificationDto dto) {
	    	System.out.println(dto.getEmail());
	    	System.out.println(dto.getOtp());
	        String storedOtp = redisTemplate.opsForValue().get(dto.getEmail());
	        if (storedOtp != null && storedOtp.equals(dto.getOtp())) {
	            redisTemplate.opsForValue().set(dto.getEmail() + "_verified", "true", Duration.ofMinutes(10));
	            return true;
	        }
	        return false;
	    }

	    @Override
	    public String signUp(SignupDto dto) {
	        String verified = redisTemplate.opsForValue().get(dto.getEmail() + "_verified");
	        if (verified == null || !verified.equals("true")) {
	            return "OTP not verified. Please verify your email first.";
	        }

	        dto.setPassword(encoder.encode(dto.getPassword()));

	        String url = "http://UserService/user/create";
	        try {
	        restTemplate.postForEntity(url, dto, String.class);
	        }catch(Exception e) {
	        	return "user already exists with the email";
	        }

	        redisTemplate.delete(dto.getEmail());
	        redisTemplate.delete(dto.getEmail() + "_verified");

	        return "Signup successful!";
	    }
	
	@Override
	public void updateProfile(User user) {
		user.setPassword(encoder.encode(user.getPassword()));
		String url="http://UserService/user/update";
		restTemplate.put(url, user);

	}

	@Override
	public void deleteProfile(Long id) {
		String url="http://UserService/user/delete/"+id;
		restTemplate.delete(url);
	}



}
