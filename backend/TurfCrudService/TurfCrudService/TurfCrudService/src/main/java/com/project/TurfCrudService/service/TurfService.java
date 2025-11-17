package com.project.TurfCrudService.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.project.TurfCrudService.entity.Turf;

@Service
public interface TurfService {


	Turf createTurf(Turf turf, MultipartFile image);

	String deleteTurf(Long id);

	String updateTurf(Long id, Turf turf);

	Turf getTurf(Long id);

	List<Turf> getAllTurfs();
	

}
