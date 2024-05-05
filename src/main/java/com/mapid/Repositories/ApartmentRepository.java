package com.mapid.Repositories;

import com.mapid.Entities.Apartment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApartmentRepository extends JpaRepository<Apartment, Integer> {
}
