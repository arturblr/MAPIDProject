package com.mapidproject.controller;

import com.mapidproject.model.Apartment;
import com.mapidproject.service.ApartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/apartments")
public class ApartmentController {
    @Autowired
    private ApartmentService apartmentService;

    @GetMapping
    public List<Apartment> getAllApartments() {
        return apartmentService.getAllApartments();
    }

    @GetMapping("/{id}")
    public Apartment getApartmentById(@PathVariable Long id) {
        return apartmentService.getApartmentById(id);
    }

    @PostMapping
    public Apartment saveApartment(@RequestBody Apartment apartment) {
        return apartmentService.saveApartment(apartment);
    }

    @DeleteMapping("/{id}")
    public void deleteApartment(@PathVariable Long id) {
        apartmentService.deleteApartment(id);
    }
}
