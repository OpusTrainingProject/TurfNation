package com.review.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.review.Entity.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

	    List<Review> findByTurfId(Long turfId);
	  
	    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.turfId = :turfId")
	    Double getAverageRatingByTurfId(@Param("turfId") Long turfId);
	   
	    Long countByTurfId(Long turfId);
	
}
