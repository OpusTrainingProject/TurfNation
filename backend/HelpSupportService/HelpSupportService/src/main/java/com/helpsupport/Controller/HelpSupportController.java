package com.helpsupport.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.helpsupport.DTO.HelpSupportDTO;
import com.helpsupport.Entity.HelpSupport;
import com.helpsupport.Service.HelpSupportService;

@RestController
@RequestMapping("/helpsupport")

public class HelpSupportController {

    @Autowired
    private HelpSupportService helpSupportService;

    @PostMapping
    public ResponseEntity<HelpSupport> createConcern(@RequestBody HelpSupportDTO dto,
                                                     @RequestHeader("user-id") Long userId) {
        HelpSupport concern = helpSupportService.createConcern(dto, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(concern);
    }

    @GetMapping("/active")
    public ResponseEntity<List<HelpSupport>> getActiveConcerns() {
        return ResponseEntity.ok(helpSupportService.getActiveConcerns());
    }

    @PutMapping("/{id}/resolve")
    public ResponseEntity<HelpSupport> markAsResolved(@PathVariable Long id) {
        HelpSupport updated = helpSupportService.markAsResolved(id);
        return ResponseEntity.ok(updated);
    }
}
