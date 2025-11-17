package com.example.TurfServiceImpl;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.example.DTO.BookingCreatedEvent;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class BookingEventPublisher {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public BookingEventPublisher(KafkaTemplate<String, Object> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void publishBookingCreatedEvent(BookingCreatedEvent event) {
        try {
            
            kafkaTemplate.send("notification-topic", event);
            System.out.println("✅ Published booking event to Kafka: " + event);
        } catch (Exception e) {
            System.err.println("❌ Error while publishing booking event: " + e.getMessage());
        }
    }
}
