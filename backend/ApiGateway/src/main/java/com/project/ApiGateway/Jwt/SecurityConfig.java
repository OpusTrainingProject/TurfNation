//package com.project.ApiGateway.Jwt;
//
//import java.util.Arrays;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
////import org.springframework.security.authentication.AuthenticationManager;
////import org.springframework.security.config.Customizer;
////import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
////import org.springframework.security.core.userdetails.UserDetailsService;
////import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
////import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//
//@Configuration	// declare this class as a configuration class(dont do this in traditional way, do it in my way)
//@EnableWebSecurity // enable the web security for application
//public class SecurityConfig {
////	@Autowired
////	private UserDetailsService userDetailsService;
//	
//	@Autowired
//	private JwtFilter jwtFilter;
//	
//
//	@Bean
//	CorsConfigurationSource corsConfigurationSource() {
//	    CorsConfiguration config = new CorsConfiguration();
//	    config.setAllowedOrigins(Arrays.asList("http://localhost:5173")); //react default allow origin
////	    config.setAllowedOrigins(Arrays.asList("*"));
//	    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//	    config.setAllowedHeaders(Arrays.asList("*"));
//	    config.setAllowCredentials(true); // Allow cookies
//
//	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//	    source.registerCorsConfiguration("/**", config);
//	    return source;
//	}
//
//	
//
//	@Bean
//	SecurityFilterChain authorizeRequests(HttpSecurity http) throws Exception {
//	    http
//	        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
//	        .csrf(csrf -> csrf.disable())
//	        .authorizeHttpRequests(auth -> auth
//	            .requestMatchers(
//	                "/signin", 
//	                "/signup/**",
//	                "/verifyuser",
//	                "/edit-profile",
//	                "/uploads/images/**",   // allow static images
//	                "/css/**",     			// allow CSS
//	                "/js/**",       		// allow JavaScript
//	                "/assets/**"    		// allow assets
//	               
//	                
//	                
//	            ).permitAll()
//	            .requestMatchers("/manager/auctioneer/**").hasAnyRole("User","Admin")
//	            .requestMatchers("/User/**").hasRole("User")
//	            .requestMatchers("/Admin/**").hasRole("Admin")
//	            .anyRequest().authenticated()
//	        )
//	        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
//	        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//
//	    return http.build();
//	}
//
//
//	
//}

	
	package com.project.ApiGateway.Jwt;

	import org.springframework.context.annotation.Bean;
	import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
	import org.springframework.security.web.server.SecurityWebFilterChain;
	import org.springframework.web.cors.CorsConfiguration;
	import org.springframework.web.cors.reactive.CorsConfigurationSource;
	import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

	import java.util.Arrays;

	@Configuration
	@EnableWebFluxSecurity
	public class SecurityConfig {

	    @Bean
	    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
	    	System.out.println("securityConfig start");
	        http
	                .csrf(csrf -> csrf.disable())
	                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
	                .authorizeExchange(exchange -> exchange
	                        .pathMatchers("/auth/signin", "/auth/signup", "/verifyuser", "/edit-profile",
	                                "/auth/afterSignIn", "/css/**", "/js/**", "/assets/**")
	                        .permitAll()
	                        .anyExchange().permitAll() // Gateway normally doesn't block downstream routes
	                );
	    	System.out.println("securityConfig end");
	        // ⚠️ No addFilterBefore — our JwtFilter is a GlobalFilter, not a servlet filter
	        return http.build();
	    }

	    @Bean
	    public CorsConfigurationSource corsConfigurationSource() {
	        CorsConfiguration config = new CorsConfiguration();
	        config.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
	        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
	        config.setAllowedHeaders(Arrays.asList("*"));
	        config.setAllowCredentials(true);

	        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	        source.registerCorsConfiguration("/**", config);
	        return source;
	    }
	}
