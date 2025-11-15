package com.helpsupport.ServiceImpl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.helpsupport.DTO.HelpSupportDTO;
import com.helpsupport.Dao.HelpSupportRepository;
import com.helpsupport.Entity.HelpSupport;
import com.helpsupport.Service.HelpSupportService;

@Service
@Transactional
public class HelpSupportServiceImpl implements HelpSupportService {

    @Autowired
    private HelpSupportRepository helpSupportRepository;

    @Override
    public HelpSupport createConcern(HelpSupportDTO dto, Long userId) {
        HelpSupport concern = new HelpSupport();
        concern.setUserId(userId);
        concern.setName(dto.getName());
        concern.setEmail(dto.getEmail());
        concern.setConcernType(dto.getConcernType());
        concern.setMessage(dto.getMessage());
        concern.setCreatedOn(LocalDateTime.now());
        concern.setStatus(HelpSupport.SupportStatus.ACTIVE);

        return helpSupportRepository.save(concern);
    }

    @Override
    public List<HelpSupport> getActiveConcerns() {
        return helpSupportRepository.findByStatus(HelpSupport.SupportStatus.ACTIVE);
    }

    @Override
    public HelpSupport markAsResolved(Long id) {
        HelpSupport concern = helpSupportRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Concern not found"));

        concern.setStatus(HelpSupport.SupportStatus.RESOLVED);
        return helpSupportRepository.save(concern);
    }
}
