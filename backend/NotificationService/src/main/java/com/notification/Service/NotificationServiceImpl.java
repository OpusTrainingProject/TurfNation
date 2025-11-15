package com.notification.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.notification.Entity.BookingDTO;
import com.notification.Entity.NotificationRequest;
import com.notification.Entity.TournamentDTO;
import com.notification.Entity.TurfDTO;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public void sendNotification(NotificationRequest request) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(request.getEmail());

        switch (request.getNotificationType()) {
            case OTP:
                message.setSubject("Your OTP Code");
                message.setText("Hello " + request.getEmail() + ", your OTP for Registration on TurfNation is: " + request.getOtp());
                break;

            case BOOKING_CONFIRMATION:
                BookingDTO booking = restTemplate.getForObject(
                    "http://localhost:8081/booking/" + request.getBookingDetails(), BookingDTO.class);

                TurfDTO turf = restTemplate.getForObject(
                    "http://localhost:8082/turf/" + booking.getTurfId(), TurfDTO.class);

                message.setSubject("Booking Confirmed");
                message.setText("Your booking is confirmed! \n\n For Turf: " + turf.getName() +
                                "\nLocation: " + turf.getLocation() +
                                "\nDate: " + booking.getDate() +
                                "\nTime: " + booking.getTime());
                break;

        }

        mailSender.send(message);
    }
}