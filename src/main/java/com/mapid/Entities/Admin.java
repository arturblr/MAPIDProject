package com.mapid.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Admins")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String username;
    private String password;

    public Object getPassword() {
        return password;
    }
}
