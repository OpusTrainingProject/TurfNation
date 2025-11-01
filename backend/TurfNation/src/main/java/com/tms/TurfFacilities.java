package com.tms;



import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "turf_facilities")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TurfFacilities {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "turf_id", nullable = false)
    private Long turfId;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Facilities facility;
    
    public enum Facilities {
        CHANGING_ROOM, WIFI, PARKING, RESTROOM
    }
}

