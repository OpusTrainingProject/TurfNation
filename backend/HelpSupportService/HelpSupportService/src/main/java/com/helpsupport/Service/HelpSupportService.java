package com.helpsupport.Service;

import java.util.List;

import com.helpsupport.DTO.HelpSupportDTO;
import com.helpsupport.Entity.HelpSupport;

public interface HelpSupportService {

    HelpSupport createConcern(HelpSupportDTO dto, Long userId);
    List<HelpSupport> getActiveConcerns();
    HelpSupport markAsResolved(Long id);
	

	
}
