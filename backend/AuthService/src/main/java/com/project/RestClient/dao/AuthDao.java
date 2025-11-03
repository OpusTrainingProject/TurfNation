package com.project.RestClient.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.RestClient.entity.User;

@Repository
public interface AuthDao extends JpaRepository<User, Long>{
	Optional<User>findByEmail(String email);

}
