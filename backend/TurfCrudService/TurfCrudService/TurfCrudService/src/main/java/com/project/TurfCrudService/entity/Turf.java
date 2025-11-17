package com.project.TurfCrudService.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Turf {
	
	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long turfId;
	    
	    @Column(name = "turf_name", nullable = false)
	    private String turfName;
	    
	    @Column(name = "turf_location", nullable = false)
	    private String turfLocation;

		
	    @Column(name = "turf_image",length=1000)
		private String turfImage;

	    
	    @Column(nullable = false)
	    private String address;
	    
	    @Column(name = "is_active")
	    private Boolean isActive = true;
	    
	    public Integer getPricePerSlot() {
			return pricePerSlot;
		}

		public void setPricePerSlot(Integer pricePerSlot) {
			this.pricePerSlot = pricePerSlot;
		}

		@Column(columnDefinition = "TEXT")
	    private String description;
	    
	    @CreationTimestamp
	    @Column(name = "created_on",updatable = false)
	    private LocalDateTime createdOn;
	    
	    @UpdateTimestamp
	    @Column(name = "updated_on")
	    private LocalDateTime updatedOn;
	    
	    @Column(name="Price")
	    private Integer pricePerSlot;

		public Turf(String turfName, String turfLocation, String turfImage, String address,
				String description,Integer pricePerSlot ) {
			this.turfName = turfName;
			this.turfLocation = turfLocation;
			this.turfImage = turfImage;
			this.address = address;
			this.description = description;
			this.pricePerSlot = pricePerSlot;
		
		}
		
		public Turf()
		{
		}

		public String getTurfName() {
			return turfName;
		}

		public void setTurfName(String turfName) {
			this.turfName = turfName;
		}

		public String getTurfLocation() {
			return turfLocation;
		}

		public void setTurfLocation(String turfLocation) {
			this.turfLocation = turfLocation;
		}

		public String getTurfImage() {
			return turfImage;
		}

		public void setTurfImage(String imageUrl) {
			this.turfImage = imageUrl;
		}

		public String getAddress() {
			return address;
		}

		public void setAddress(String address) {
			this.address = address;
		}

		public Boolean getIsActive() {
			return isActive;
		}

		public void setIsActive(Boolean isActive) {
			this.isActive = isActive;
		}

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public LocalDateTime getCreatedOn() {
			return createdOn;
		}

		public void setCreatedOn(LocalDateTime createdOn) {
			this.createdOn = createdOn;
		}

		public LocalDateTime getUpdatedOn() {
			return updatedOn;
		}

		public void setUpdatedOn(LocalDateTime updatedOn) {
			this.updatedOn = updatedOn;
		}

		public Long getTurfid() {
			return turfId;
		}

		public void setTurfid(Long turfid) {
			turfId = turfid;
		}
	    	
		
		
	    
	    	
}
