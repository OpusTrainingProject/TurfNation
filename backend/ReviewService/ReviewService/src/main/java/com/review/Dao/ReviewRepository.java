package com.review.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.review.Entity.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

	 List<Review> findByTurfId(Long turfId);
	
}
