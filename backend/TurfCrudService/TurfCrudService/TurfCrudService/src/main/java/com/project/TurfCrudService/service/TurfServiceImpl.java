package com.project.TurfCrudService.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.project.TurfCrudService.dao.TurfDao;
import com.project.TurfCrudService.entity.Turf;

@Service
public class TurfServiceImpl implements TurfService {

	@Autowired
	private TurfDao turfDao;
	
    @Autowired
    private Cloudinary cloudinary;
	
	@Override
	public String deleteTurf(Long id) {
		 turfDao.deleteById(id);
		 return "Turf Deleted Successfully";
	}



	@Override
	public String updateTurf(Long id, Turf turf) {
		Optional<Turf>existingTurf = turfDao.findById(id);
		if(existingTurf.isPresent())
		{
			Turf existingTurfUpdate = existingTurf.get();
			existingTurfUpdate.setTurfName(turf.getTurfName());
			existingTurfUpdate.setAddress(turf.getAddress());
			existingTurfUpdate.setTurfLocation(turf.getTurfLocation());
			existingTurfUpdate.setDescription(turf.getDescription());
			existingTurfUpdate.setPricePerSlot(turf.getPricePerSlot());
//			Turf savedTurf = turfDao.save(existinTurfUpdate);
			turfDao.save(existingTurfUpdate);
			return "Turf Updated Successfully";
		}
		else
		{
			return "Turf not found";
		}
	}


	@Override
	public Turf getTurf(Long id) {
		return turfDao.findById(id)
		            .orElseThrow(() -> new RuntimeException("Turf not found with id: " + id));
	}


	@Override
	public Turf createTurf(Turf turf, MultipartFile image) {
	    try {
	        Map uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap());
	        String imageUrl = (String) uploadResult.get("secure_url");
	        turf.setTurfImage(imageUrl);

	        return turfDao.save(turf);
	    } catch (Exception e) {
	        e.printStackTrace();
	        throw new RuntimeException("Image upload failed", e);
	    }
	}
	
	@Override
	public List<Turf> getAllTurfs() {
	    return turfDao.findAll();
	}






}
