package com.mapidproject.repository;

import com.mapidproject.model.Apartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApartmentRepository extends JpaRepository<Apartment, Long> {
    // Additional custom queries can be defined here if needed
}
