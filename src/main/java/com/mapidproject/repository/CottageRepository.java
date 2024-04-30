package com.mapidproject.repository;

import com.mapidproject.model.Cottage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CottageRepository extends JpaRepository<Cottage, Long> {
    // Additional custom queries can be defined here if needed
}
