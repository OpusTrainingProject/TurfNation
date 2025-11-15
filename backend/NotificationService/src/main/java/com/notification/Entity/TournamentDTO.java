package com.notification.Entity;

public class TournamentDTO {
	

	    private Long turfId;
	    private String name;
	    private String date;
	    
	    public TournamentDTO () {
	    	
	    }

		public TournamentDTO(Long turfId, String name, String date) {
		
			this.turfId = turfId;
			this.name = name;
			this.date = date;
		}

		public Long getTurfId() {
			return turfId;
		}

		public void setTurfId(Long turfId) {
			this.turfId = turfId;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getDate() {
			return date;
		}

		public void setDate(String date) {
			this.date = date;
		}

	    
	    

}
