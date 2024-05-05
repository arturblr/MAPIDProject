// ApartmentController.java
package com.mapid.Controllers;

import com.mapid.Services.ApartmentService;
import com.mapid.Entities.Apartment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/apartments")
public class ApartmentController {

    @Autowired
    private ApartmentService apartmentService;

    @PostMapping
    public Apartment addApartment(@RequestBody Apartment apartment) {
        return apartmentService.addApartment(apartment);
    }

    @PutMapping("/{id}")
    public Apartment updateApartment(@PathVariable int id, @RequestBody Apartment updatedApartment) {
        return apartmentService.updateApartment(id, updatedApartment);
    }
    @GetMapping
    public List<Apartment> getAllApartments() {
        return apartmentService.getAllApartments();
    }

    @GetMapping("/{id}")
    public Apartment getApartmentById(@PathVariable int id) {
        return apartmentService.getApartmentById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteApartment(@PathVariable int id) {
        apartmentService.deleteApartment(id);
    }
}
