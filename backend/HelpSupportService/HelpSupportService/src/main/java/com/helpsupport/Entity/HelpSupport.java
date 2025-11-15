package com.helpsupport.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "help_support")
public class HelpSupport {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long helpsupportId;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;
    
    @Column(name = "created_on",  updatable = false)
    private LocalDateTime createdOn;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "concern_type", nullable = false)
    private ConcernType concernType;
    
    @Column(columnDefinition = "TEXT", nullable = false)
    private String message;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SupportStatus status = SupportStatus.ACTIVE;
    

    
    public enum ConcernType {
        BOOKING_RELATED, TURF_RELATED, PAYMENT_RELATED, TOURNAMENT_RELATED, OTHER
    }
    
    public enum SupportStatus {
        ACTIVE, RESOLVED, CLOSED
    }
    
    public HelpSupport() {
    	
    }

	public HelpSupport(Long helpsupportId, Long userId, String name, String email, LocalDateTime createdOn,
			ConcernType concernType, String message, SupportStatus status) {
	
		this.helpsupportId = helpsupportId;
		this.userId = userId;
		this.name = name;
		this.email = email;
		this.createdOn = createdOn;
		this.concernType = concernType;
		this.message = message;
		this.status = status;
	}

	public Long getHelpsupportId() {
		return helpsupportId;
	}

	public void setHelpsupportId(Long helpsupportId) {
		this.helpsupportId = helpsupportId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public LocalDateTime getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(LocalDateTime createdOn) {
		this.createdOn = createdOn;
	}

	public ConcernType getConcernType() {
		return concernType;
	}

	public void setConcernType(ConcernType concernType) {
		this.concernType = concernType;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public SupportStatus getStatus() {
		return status;
	}

	public void setStatus(SupportStatus status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "HelpSupport [helpsupportId=" + helpsupportId + ", userId=" + userId + ", name=" + name + ", email="
				+ email + ", createdOn=" + createdOn + ", concernType=" + concernType + ", message=" + message
				+ ", status=" + status + "]";
	}

	
    
}
