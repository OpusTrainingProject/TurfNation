package com.notification.Consumer;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.notification.Entity.NotificationRequest;
import com.notification.Service.NotificationService;

@Service
public class NotificationConsumer {

    @Autowired
    private NotificationService notificationService;

    @KafkaListener(topics = "notification-topic", groupId = "notification-group")
    public void consumeNotification(String messageJson) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            NotificationRequest request = mapper.readValue(messageJson, NotificationRequest.class);
            notificationService.sendNotification(request);
           
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}