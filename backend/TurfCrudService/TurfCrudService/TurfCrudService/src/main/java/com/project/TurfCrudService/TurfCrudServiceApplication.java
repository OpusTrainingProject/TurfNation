package com.project.TurfCrudService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
<<<<<<< HEAD
=======
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
>>>>>>> e2226885ba7d4d53de829d923a2709ebdcfa0710
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
<<<<<<< HEAD
=======
@EnableDiscoveryClient
>>>>>>> e2226885ba7d4d53de829d923a2709ebdcfa0710
public class TurfCrudServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(TurfCrudServiceApplication.class, args);
		System.out.println("Turf Service Up & Running !!");
	}
	

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5173") 
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowedHeaders("*");
            }
        };
    }

}
