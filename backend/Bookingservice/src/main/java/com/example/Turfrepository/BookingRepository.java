package com.example.Turfrepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.entities.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Long> {
	  List<Booking> findByUserId(Long userId);
	  
	  @Query("SELECT b FROM Booking b WHERE b.turfId = :turfId AND b.bookingDate = :date AND b.bookingStatus <> 'CANCELLED'" +
	           "AND ((b.startTime < :endTime) AND (b.endTime > :startTime))")
	    List<Booking> findOverlappingBookings(
	        @Param("turfId") Long turfId,
	        @Param("date") LocalDate date,
	        @Param("startTime") LocalTime startTime,
	        @Param("endTime") LocalTime endTime
	    );
	  
	  
	  
	  List<Booking> findByTurfId(Long turfId);
	  
	  
	  @Query("SELECT b.bookingDate, COUNT(b) " + "FROM Booking b " +
	           "WHERE b.bookingDate >= :startDate " +
	           "GROUP BY b.bookingDate " +
	           "ORDER BY b.bookingDate")
	    List<Object[]> getWeeklyBookingStats(@Param("startDate") LocalDate startDate);
	  
	  
}
