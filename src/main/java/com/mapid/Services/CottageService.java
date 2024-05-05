package com.mapid.Services;

import com.mapid.Entities.Cottage;
import com.mapid.Repositories.CottageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CottageService {

    @Autowired
    private CottageRepository cottageRepository;

    public Cottage addCottage(Cottage cottage) {
        return cottageRepository.save(cottage);
    }

    public List<Cottage> getAllCottages() {
        return cottageRepository.findAll();
    }

    public Cottage getCottageById(int id) {
        return cottageRepository.findById(id).orElse(null);
    }

    public void deleteCottage(int id) {
        cottageRepository.deleteById(id);
    }

    public Cottage updateCottage(int id, Cottage updatedCottage) {
        Optional<Cottage> existingCottageOpt = cottageRepository.findById(id);
        if (!existingCottageOpt.isPresent()) {
            return null; // Handle case where cottage is not found
        }

        Cottage existingCottage = existingCottageOpt.get();

        // Update properties with new data
        existingCottage.setType(updatedCottage.getType());
        existingCottage.setSize(updatedCottage.getSize());
        existingCottage.setPrice(updatedCottage.getPrice());
        existingCottage.setImage(updatedCottage.getImage());

        // Save updated cottage back to the database
        return cottageRepository.save(existingCottage);
    }
}
