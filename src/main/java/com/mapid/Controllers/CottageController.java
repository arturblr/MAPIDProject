// CottageController.java
package com.mapid.Controllers;

import com.mapid.Services.CottageService;
import com.mapid.Entities.Cottage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cottages")
public class CottageController {

    @Autowired
    private CottageService cottageService;

    @PostMapping
    public Cottage addCottage(@RequestBody Cottage cottage) {
        return cottageService.addCottage(cottage);
    }

    @PutMapping("/{id}")
    public Cottage updateCottage(@PathVariable int id, @RequestBody Cottage updatedCottage) {
        return cottageService.updateCottage(id, updatedCottage);
    }

    @GetMapping
    public List<Cottage> getAllCottages() {
        return cottageService.getAllCottages();
    }

    @GetMapping("/{id}")
    public Cottage getCottageById(@PathVariable int id) {
        return cottageService.getCottageById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteCottage(@PathVariable int id) {
        cottageService.deleteCottage(id);
    }
}
