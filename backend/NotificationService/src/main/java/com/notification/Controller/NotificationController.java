package com.notification.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notification.Entity.NotificationRequest;
import com.notification.Service.NotificationService;

@RestController
@RequestMapping("/notification")
public class NotificationController {

	    @Autowired
	    private NotificationService notificationService;

	    @PostMapping
	    public ResponseEntity<String> sendNotification(@RequestBody NotificationRequest request) {
	        notificationService.sendNotification(request);
	        return ResponseEntity.ok("Notification sent successfully");
	    }
	}
	
