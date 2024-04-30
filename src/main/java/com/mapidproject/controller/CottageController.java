package com.mapidproject.controller;

import com.mapidproject.model.Cottage;
import com.mapidproject.service.CottageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cottages")
public class CottageController {
    @Autowired
    private CottageService cottageService;

    @GetMapping
    public List<Cottage> getAllCottages() {
        return cottageService.getAllCottages();
    }

    @GetMapping("/{id}")
    public Cottage getCottageById(@PathVariable Long id) {
        return cottageService.getCottageById(id);
    }

    @PostMapping
    public Cottage saveCottage(@RequestBody Cottage cottage) {
        return cottageService.saveCottage(cottage);
    }

    @DeleteMapping("/{id}")
    public void deleteCottage(@PathVariable Long id) {
        cottageService.deleteCottage(id);
    }
}
