package com.project.TurfCrudService.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.TurfCrudService.entity.Turf;
import com.project.TurfCrudService.service.TurfService;

@CrossOrigin("*") 
@RestController
@RequestMapping("/turf")
public class TurfController {
	
	@Autowired
	private TurfService turfService;

	@PostMapping(value = "/addTurf", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<Turf> createTurf(
	        @RequestParam("turfName") String turfName,
	        @RequestParam("turfLocation") String turfLocation,
	        @RequestParam("address") String address,
	        @RequestParam("description") String description,
	        @RequestParam("pricePerSlot") Integer pricePerSlot,
	        @RequestParam("turfImage") MultipartFile image) {

	    Turf turf = new Turf();
	    turf.setTurfName(turfName);
	    turf.setTurfLocation(turfLocation);
	    turf.setAddress(address);
	    turf.setDescription(description);
	    turf.setPricePerSlot(pricePerSlot);

	    Turf savedTurf = turfService.createTurf(turf, image);
	    return ResponseEntity.ok(savedTurf);
	}

	
//	 Update Turf by id
	@PutMapping("/updateTurf/{turfid}")
	public String updateTurf(@PathVariable("turfid") Long id,@RequestBody Turf turf) {
	   return turfService.updateTurf(id, turf);
	    
	}
//	// Delete Turf by id
//	@DeleteMapping("/deleteTurf/{turfid}")
//	public String deleteTurf(@PathVariable("turfid") Long turfId)
//	{
//		return turfService.deleteTurf(turfId);
//	}
	
	
	
	// Delete Turf by ID
	@DeleteMapping("/deleteTurf/{turfId}")
	public String deleteTurf(@PathVariable("turfId") Long turfId) {
	    return turfService.deleteTurf(turfId);
	}

	// Get a single turf
	@GetMapping("/getATurf/{turfid}")
	public Turf getTurf(@PathVariable("turfid") Long turfid)
	{
		return turfService.getTurf(turfid);
	}
	
	@GetMapping("/getAllTurfs")
	public List<Turf> getAllTurfs() {
	    return turfService.getAllTurfs();
	}


}
