package com.project.RestClient.service;

import java.util.Random;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.project.RestClient.entity.NotificationDto;
import com.project.RestClient.entity.User;
import com.project.RestClient.entity.UserOtpDto;


@Service
public class AuthServiceImpl implements AuthService{

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private RedisTemplate<String, String> redisTemplate;

	@Override
	public ResponseEntity<String> signUp(UserOtpDto dto) {
		// TODO Auto-generated method stub
		System.out.println(dto);
		String otp=redisTemplate.opsForValue().get(dto.getEmail());
		System.out.println(otp);
		if(otp!=null && otp.equals(dto.getOtp().toString())) {
			dto.setPassword(encoder.encode(dto.getPassword()));
			String url="http://UserService/user/create";
			ResponseEntity<String> success= restTemplate.postForEntity(url, dto, String.class);
			redisTemplate.delete(dto.getEmail());
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
		StringBuilder captcha = new StringBuilder();

        for (int i = 0; i < 6; i++) { // 6-letter captcha
            char letter = (char) ('A' + random.nextInt(26));
            captcha.append(letter);
        }
        String finalCaptcha=captcha.toString().trim();
        redisTemplate.opsForValue().set(email.trim(), finalCaptcha, 5, TimeUnit.MINUTES);//		redisTemplate.opsForValue().set("value", "email");
		NotificationDto otpDto=new NotificationDto();
		otpDto.setEmail(email);
		otpDto.setOtp(captcha.toString());
		System.out.println(captcha.toString());
//		String url="http://NotificationService/Notification/send";		//service down for a while
//		restTemplate.postForEntity(url, otpDto, String.class);

	}

}
