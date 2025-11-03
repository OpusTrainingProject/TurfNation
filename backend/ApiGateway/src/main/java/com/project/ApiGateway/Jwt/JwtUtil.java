package com.project.ApiGateway.Jwt;

import java.security.Key;  
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component // marks class as a spring bean i.e., DI can be done
public class JwtUtil {
	@Value(value = "${jwt.token.secret}")
	public String jwtSecret;
	private Key jwtKey;
	
	@PostConstruct // to run the method after @Value is set
	public void init() {
		jwtKey=Keys.hmacShaKeyFor(jwtSecret.getBytes()); //string secret --> secure HMAC key for signing jwt's	
		System.out.println("jwtUtil init");
	}
	
	
	public Authentication validateToken(String token) {
		JwtParser parser= Jwts.parserBuilder().setSigningKey(jwtKey).build();
		Claims claims= parser
				.parseClaimsJws(token)
				.getBody();
		String userId= claims.getSubject();
		String roles= (String) claims.get("role");
		List<GrantedAuthority> authorities= AuthorityUtils.commaSeparatedStringToAuthorityList(roles);
		return new UsernamePasswordAuthenticationToken(userId, null , authorities); //the params : userid= principal-->null=
																					//credentials(dont want password in token
																					//authorities= roles this object passed to 
																					//Spring sec. ctxt. user authenticated
		
	}
}
