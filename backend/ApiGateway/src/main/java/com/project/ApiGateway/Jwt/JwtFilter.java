//package com.project.ApiGateway.Jwt;
//
//import java.io.IOException;
//import java.util.stream.Collectors;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//
//
//
//@Component
//public class JwtFilter extends OncePerRequestFilter{
//	
//	@Autowired
//	private JwtUtil jwtUtil;
//	
//	@Override
//	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//			throws ServletException, IOException {
//		// TODO Auto-generated method stub
//		String authHeader= request.getHeader("Authorization");	//get header from the request
//		boolean validHeader= authHeader!=null && authHeader.startsWith("Bearer");
//		Authentication auth=null;
//		if(validHeader) {
//			String token= authHeader.replace("Bearer","").trim();
//			auth= jwtUtil.validateToken(token);
//		}
//		
//		if( auth != null && SecurityContextHolder.getContext().getAuthentication()==null) {
////			SecurityContextHolder.getContext().setAuthentication(auth);
//			request.setAttribute("id", auth.getPrincipal());
//            request.setAttribute("role", auth.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()));
//		}
//		
//		
//		filterChain.doFilter(request, response);
//	}
//	
//}

package com.project.ApiGateway.Jwt;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import reactor.core.publisher.Mono;

@Component
@Order(1)
public class JwtFilter implements GlobalFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            // 🔹 No JWT found, continue downstream (like for /auth/signup, etc.)
            return chain.filter(exchange);
        }

        try {
            String token = authHeader.substring(7).trim(); // ✅ cleaner way

            Authentication auth = jwtUtil.validateToken(token);
            if (auth != null) {
                String userId = auth.getPrincipal().toString();
                String roles = auth.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.joining(","));

                // 🔹 Add JWT-derived info to downstream request headers
                ServerHttpRequest mutatedRequest = exchange.getRequest().mutate()
                        .header("id", userId)
                        .header("role", roles)
                        .build();

                ServerWebExchange mutatedExchange = exchange.mutate()
                        .request(mutatedRequest)
                        .build();

                System.out.println("[JWT Filter ✅] Authenticated userId=" + userId + " roles=" + roles);
                return chain.filter(mutatedExchange);
            }

        } catch (Exception e) {
            System.out.println("[JWT Filter ❌] Token validation failed: " + e.getMessage());
            // Optional: return 401 here if you want to block invalid JWTs
        }

        // 🔹 Invalid token → continue or block depending on your choice
        return chain.filter(exchange);
    }
}

