package com.mapid.Services;

import com.mapid.Entities.Apartment;
import com.mapid.Repositories.ApartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ApartmentService {

    @Autowired
    private ApartmentRepository apartmentRepository;

    public Apartment addApartment(Apartment apartment) {
        return apartmentRepository.save(apartment);
    }

    public List<Apartment> getAllApartments() {
        return apartmentRepository.findAll();
    }

    public Apartment getApartmentById(int id) {
        return apartmentRepository.findById(id).orElse(null);
    }

    public void deleteApartment(int id) {
        apartmentRepository.deleteById(id);
    }

    public Apartment updateApartment(int id, Apartment updatedApartment) {
        Optional<Apartment> existingApartmentOpt = apartmentRepository.findById(id);
        if (!existingApartmentOpt.isPresent()) {
            return null; // Handle case where apartment is not found
        }

        Apartment existingApartment = existingApartmentOpt.get();

        // Update properties with new data
        existingApartment.setHouse(updatedApartment.getHouse());
        existingApartment.setRooms(updatedApartment.getRooms());
        existingApartment.setArea(updatedApartment.getArea());
        existingApartment.setFloor(updatedApartment.getFloor());
        existingApartment.setPrice(updatedApartment.getPrice());
        existingApartment.setImage(updatedApartment.getImage());

        // Save updated apartment back to the database
        return apartmentRepository.save(existingApartment);
    }
}

