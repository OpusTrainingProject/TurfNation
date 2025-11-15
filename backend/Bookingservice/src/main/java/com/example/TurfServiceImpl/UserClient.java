package com.example.TurfServiceImpl;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class UserClient {

    private static final String USER_SERVICE_URL = "http://localhost:8083";  // <-- Hardcoded

    private final RestTemplate restTemplate = new RestTemplate();

    public String getUserEmail(Long userId) {

        String url = USER_SERVICE_URL + "/user/getById/" + userId;

        return restTemplate.getForObject(url, String.class);
    }
}
