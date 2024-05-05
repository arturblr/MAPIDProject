package com.mapid.Repositories;

import com.mapid.Entities.Cottage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CottageRepository extends JpaRepository<Cottage, Integer> {
}
