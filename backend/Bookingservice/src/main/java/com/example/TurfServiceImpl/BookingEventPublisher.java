package com.example.TurfServiceImpl;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.example.DTO.BookingCreatedEvent;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class BookingEventPublisher {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    public BookingEventPublisher(KafkaTemplate<String, String> kafkaTemplate, ObjectMapper objectMapper) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    public void publishBookingCreatedEvent(BookingCreatedEvent event) {
        try {
            String message = objectMapper.writeValueAsString(event);
            kafkaTemplate.send("booking-created-topic", message);
            System.out.println("✅ Published booking event to Kafka: " + message);
        } catch (Exception e) {
            System.err.println("❌ Error while publishing booking event: " + e.getMessage());
        }
    }
}
