package com.project.RestClient.service;

import java.util.Random;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.project.RestClient.entity.User;
import com.project.RestClient.entity.UserOtpDto;


@Service
public class AuthServiceImpl implements AuthService{

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private RedisTemplate<String, Long> redisTemplate;

	@Override
	public ResponseEntity<String> signUp(User user, String recievedOtp) {
		// TODO Auto-generated method stub
		Long otp=redisTemplate.opsForValue().get(user.getEmail());
		if(otp!=null && otp.toString().equals(recievedOtp)) {
			user.setPassword(encoder.encode(user.getPassword()));
			String url="http://UserService/user/create";
			ResponseEntity<String> success= restTemplate.postForEntity(url, user, String.class);
			redisTemplate.delete(user.getEmail());
			return success;
		}
		else
			return ResponseEntity.ok("otp does not match");
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

	@Override
	public void sendOtpReq(String email) {
		// TODO Auto-generated method stub
		Random random=new Random();
		Long otp=(long) (1000 + random.nextInt(9000));
		redisTemplate.opsForValue().set(email, otp, 5, TimeUnit.MINUTES);
		UserOtpDto otpDto=new UserOtpDto();
		otpDto.setEmail(email);
		otpDto.setOtp(otp);
		String url="http://NotificationService/Notification/send";		//service down for a while
		restTemplate.postForEntity(url, otpDto, String.class);

	}

}
