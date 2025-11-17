package com.example.DTO;

public class TurfResponse {
    private Long id;
    private String turfName;
    private String area;
    private double price;
    
    
    
    public TurfResponse() {
    	
    }
    

    
 public TurfResponse(Long id, String turfName, String area, double price) {
		super();
		this.id = id;
		this.turfName = turfName;
		this.area = area;
		this.price = price;
	}
// Getters and Setters
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTurfName() {
		return turfName;
	}
	public void setTurfName(String turfName) {
		this.turfName = turfName;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
    
    
    
    
    
    
    
    
    
    
    
    
    
}
