package com.helpsupport.DTO;

import com.helpsupport.Entity.HelpSupport;
import com.helpsupport.Entity.HelpSupport.ConcernType;

import jakarta.persistence.Column;

public class HelpSupportDTO {

	    private String name;
	    private String email;
	    private HelpSupport.ConcernType concernType;
	    private String message;
	  

	    public HelpSupportDTO() {
	    	
	    }


		public HelpSupportDTO(String name, String email, ConcernType concernType, String message) {
			
			this.name = name;
			this.email = email;
			this.concernType = concernType;
			this.message = message;
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


		public HelpSupport.ConcernType getConcernType() {
			return concernType;
		}


		public void setConcernType(HelpSupport.ConcernType concernType) {
			this.concernType = concernType;
		}


		public String getMessage() {
			return message;
		}


		public void setMessage(String message) {
			this.message = message;
		}


		@Override
		public String toString() {
			return "HelpSupportDTO [name=" + name + ", email=" + email + ", concernType=" + concernType + ", message="
					+ message + "]";
		}

		
		

}
