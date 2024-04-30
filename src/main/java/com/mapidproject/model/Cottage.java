package com.mapidproject.model;

import javax.persistence.*;

@Entity
@Table(name="Cottages")
public class Cottage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private Double area;
    private Double price_per_sqm;
    private String description;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Double getArea() { return area; }
    public void setArea(Double area) { this.area = area; }

    public Double getPricePerSqm() { return price_per_sqm; }
    public void setPricePerSqm(Double price_per_sqm) { this.price_per_sqm = price_per_sqm; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
