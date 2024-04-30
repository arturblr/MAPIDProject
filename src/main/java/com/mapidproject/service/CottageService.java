package com.mapidproject.service;

import com.mapidproject.model.Cottage;
import com.mapidproject.repository.CottageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CottageService {
    @Autowired
    private CottageRepository cottageRepository;

    public List<Cottage> getAllCottages() {
        return cottageRepository.findAll();
    }

    public Cottage getCottageById(Long id) {
        return cottageRepository.findById(id).orElse(null);
    }

    public Cottage saveCottage(Cottage cottage) {
        return cottageRepository.save(cottage);
    }

    public void deleteCottage(Long id) {
        cottageRepository.deleteById(id);
    }
}
