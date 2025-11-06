package com.project.RestClient;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableDiscoveryClient
public class AuthServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthServiceApplication.class, args);
		System.out.println("AuthService up and running");
	}

	@Bean
	@LoadBalanced
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}
//	@Bean
//	public RedisTemplate<String, Long> redisTemplate(RedisConnectionFactory connectionFactory) {
//		RedisTemplate<String, Long> template= new RedisTemplate<>();
//		template.setConnectionFactory(connectionFactory);
//		template.setKeySerializer(new StringRedisSerializer());
//		template.setValueSerializer(new StringRedisSerializer());
//		return template;
//	}
	

}
