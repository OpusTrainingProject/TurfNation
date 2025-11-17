package com.notification;

import java.util.Properties; 

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableDiscoveryClient
@EnableKafka
public class NotificationServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(NotificationServiceApplication.class, args);
		System.out.println("notification service up and running");
	}
	
@Bean
@LoadBalanced
public RestTemplate restTemplate() {
	return new RestTemplate();
}


@Bean
   public JavaMailSender javaMailSender() {
       JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
       mailSender.setHost("smtp.gmail.com");
       mailSender.setPort(587);
       mailSender.setUsername("tushardhamak657@gmail.com");
       mailSender.setPassword("dfoblkjpfnrmsfro");

       Properties props = mailSender.getJavaMailProperties();
       props.put("mail.smtp.auth", "true");
       props.put("mail.smtp.starttls.enable", "true");
       props.put("mail.transport.protocol", "smtp");
       props.put("mail.debug", "true");

       return mailSender;
   }

//@Bean
//    public CommandLineRunner testKafkaProducer(KafkaTemplate<String, String> kafkaTemplate) {
//        return args -> {
//            NotificationRequest request = new NotificationRequest();
//            request.setToEmail("testuser@example.com");
//            request.setType(NotificationType.BOOKING_CONFIRMATION);
//            request.setTurfName("Green Turf");
////            request.setTurfLocation("Pune");
////            request.setBookingDate("2025-11-06");
////            request.setBookingTime("5 PM");
//
//            String messageJson = new ObjectMapper().writeValueAsString(request);
//            kafkaTemplate.send("notification-topic", messageJson);
//        };
//    }

	
}
