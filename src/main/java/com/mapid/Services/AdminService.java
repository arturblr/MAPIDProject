package com.mapid.Services;

import com.mapid.Entities.Admin;
import com.mapid.Repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    public Optional<Admin> findByUsername(String username) {
        return adminRepository.findByUsername(username);
    }
}
