package com.mapidproject.repository;

import com.mapidproject.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    // Additional custom queries can be defined here if needed
}
