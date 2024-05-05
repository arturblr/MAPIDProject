// AdminController.java
package com.mapid.Controllers;

import com.mapid.Services.AdminService;
import com.mapid.Entities.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginDetails) {
        try {
            String username = loginDetails.get("username");
            String password = loginDetails.get("password");

            Optional<Admin> admin = adminService.findByUsername(username);

            if (admin.isPresent() && admin.get().getPassword().equals(password)) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Login successful");
                return ResponseEntity.ok(response);
            } else {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Login failed");
                return ResponseEntity.status(401).body(response);
            }
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> response = new HashMap<>();
            response.put("message", "An error occurred during login");
            return ResponseEntity.status(500).body(response);
        }
    }



}
