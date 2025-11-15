package com.helpsupport.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.helpsupport.Entity.HelpSupport;

@Repository
public interface HelpSupportRepository extends JpaRepository<HelpSupport, Long>{

	List<HelpSupport> findByStatus(HelpSupport.SupportStatus status);
	
}
