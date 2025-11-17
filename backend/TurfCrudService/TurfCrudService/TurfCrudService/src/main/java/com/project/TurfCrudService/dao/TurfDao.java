package com.project.TurfCrudService.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.TurfCrudService.entity.Turf;

public interface TurfDao extends JpaRepository<Turf, Long>{

}
