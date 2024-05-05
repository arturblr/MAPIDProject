-- Create the database
CREATE DATABASE IF NOT EXISTS MAPID_Housing;
USE MAPID_Housing;

-- Create Apartments table
CREATE TABLE IF NOT EXISTS Apartments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    house VARCHAR(255),
    rooms INT,
    area FLOAT,
    floor INT,
    price FLOAT,
    image_url VARCHAR(2083)
);

-- Create Cottages table
CREATE TABLE IF NOT EXISTS Cottages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cottage_type VARCHAR(255),
    size FLOAT,
    price FLOAT,
    image_url VARCHAR(2083)
);

-- Create Admins table
CREATE TABLE IF NOT EXISTS Admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

-- Create Messages table
CREATE TABLE IF NOT EXISTS Messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
