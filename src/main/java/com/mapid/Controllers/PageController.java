package com.mapid.Controllers;

import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {
    @GetMapping("/admin")
    public String showAdminPanel() {
        return "admin"; // Maps to templates/admin.html
    }

    @GetMapping("/cottages")
    public String showCottages() {
        return "cottages"; // Maps to templates/cottages.html
    }

    @GetMapping("/apartments")
    public String showApartments() {
        return "apartments"; // Maps to templates/apartments.html
    }

    @GetMapping("/contact")
    public String showContact() {
        return "contact"; // Maps to templates/contact.html
    }
}
