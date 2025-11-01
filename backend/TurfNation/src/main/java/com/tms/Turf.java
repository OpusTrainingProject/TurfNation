package com.tms;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "turfs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Turf {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "turf_name", nullable = false)
    private String turfName;
    
    @Column(name = "turf_location", nullable = false)
    private String turfLocation;
    
    @Column(name = "turf_image")
    private String turfImage;
    
    @Column(nullable = false)
    private String address;
    
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "created_on", nullable = false, updatable = false)
    private LocalDateTime createdOn;
    
    @Column(name = "updated_on")
    private LocalDateTime updatedOn;
    
    @Column(name = "user_id", nullable = false)
    private Long userId; 
    
    
}
