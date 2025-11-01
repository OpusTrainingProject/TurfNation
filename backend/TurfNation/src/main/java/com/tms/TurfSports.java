package com.tms;



import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "turf_sports")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TurfSports {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Sports sports;
    
    @Column(name = "turf_id", nullable = false)
    private Long turfId;
    
    public enum Sports {
        CRICKET, FOOTBALL, TENNIS, BADMINTON
    }
}

