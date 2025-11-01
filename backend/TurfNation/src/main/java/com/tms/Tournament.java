package com.tms;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "tournaments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tournament {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "tournament_name", nullable = false)
    private String tournamentName;
    
    @Column(name = "tournament_description", columnDefinition = "TEXT")
    private String tournamentDescription;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "sport_type", nullable = false)
    private SportType sportType;
    
    @Column(name = "turf_id", nullable = false)
    private Long turfId;
    
    @Column(name = "created_by_user_id", nullable = false)
    private Long createdByUserId;
    
    @Column(name = "tournament_start_date", nullable = false)
    private LocalDate tournamentStartDate;
    
    @Column(name = "tournament_end_date", nullable = false)
    private LocalDate tournamentEndDate;
    
    @Column(name = "registration_start_date", nullable = false)
    private LocalDateTime registrationStartDate;
    
    @Column(name = "registration_end_date", nullable = false)
    private LocalDateTime registrationEndDate;
    
    @Column(name = "min_participants", nullable = false)
    private Integer minParticipants = 2;
    
    @Column(name = "max_participants", nullable = false)
    private Integer maxParticipants;
    
    @Column(name = "current_participants")
    private Integer currentParticipants = 0;
    
    @Column(name = "entry_fee", nullable = false)
    private BigDecimal entryFee;
    
    @Column(name = "prize_pool")
    private BigDecimal prizePool;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TournamentStatus status = TournamentStatus.OPEN;
    
    @Column(name = "tournament_banner")
    private String tournamentBanner;
    
    @Column(name = "rules_and_regulations", columnDefinition = "TEXT")
    private String rulesAndRegulations;
    
    @Column(name = "created_on", nullable = false, updatable = false)
    private LocalDateTime createdOn;
    
    @Column(name = "updated_on")
    private LocalDateTime updatedOn;
    
    
    public enum SportType {
        CRICKET, FOOTBALL, TENNIS, BADMINTON
    }
    
    public enum TournamentStatus {
       OPEN,  ONGOING, COMPLETED, CANCELLED
    }
}

