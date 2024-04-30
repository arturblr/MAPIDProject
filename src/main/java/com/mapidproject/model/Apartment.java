package com.mapidproject.model;

import javax.persistence.*;

@Entity
@Table(name="Apartments")
public class Apartment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String house;
    private Integer floor;
    private Integer rooms;
    private Double area;
    private Double price;
    private String additional_features;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getHouse() { return house; }
    public void setHouse(String house) { this.house = house; }

    public Integer getFloor() { return floor; }
    public void setFloor(Integer floor) { this.floor = floor; }

    public Integer getRooms() { return rooms; }
    public void setRooms(Integer rooms) { this.rooms = rooms; }

    public Double getArea() { return area; }
    public void setArea(Double area) { this.area = area; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getAdditionalFeatures() { return additional_features; }
    public void setAdditionalFeatures(String additional_features) { this.additional_features = additional_features; }
}
