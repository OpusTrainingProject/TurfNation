package com.project.PaymentService;

import org.springframework.boot.SpringApplication; 
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
//import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
//@EnableDiscoveryClient
public class PaymentServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(PaymentServiceApplication.class, args);
	}

	@Bean
//	@LoadBalanced
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}
}

//#post     http://localhost:8080/payment/order
//	{
//"amount": 50,
//"turfId": 101,
//"bookingId": 2025,
//"userId": 12,
//"currency": "INR"
//}
//http://localhost:8080/payment/verify
//{
//"paymentId": "pay_RdVvrEUS6XJOvc",
//"orderId": "order_RdVuq5UmTOmv8C",
//"signature": "3d8f424742448e7fa60d890d1b674acde4551680c429f6f552f67d22dd80c367"
//}