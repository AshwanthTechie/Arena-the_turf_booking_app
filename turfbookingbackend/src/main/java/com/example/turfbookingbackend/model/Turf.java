package com.example.turfbookingbackend.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Turf")
public class Turf {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long turfId;
    String name, address, location, phone, price, email, profilePic, timings, description, password;
    Double ratings;
    List<String> services, type, photos;
    
    public Long getTurfId() {
        return turfId;
    }
    public void setTurfId(Long turfId) {
        this.turfId = turfId;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getPrice() {
        return price;
    }
    public void setPrice(String price) {
        this.price = price;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getProfilePic() {
        return profilePic;
    }
    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }
    public String getTimings() {
        return timings;
    }
    public void setTimings(String timings) {
        this.timings = timings;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public Double getRatings() {
        return ratings;
    }
    public void setRatings(Double ratings) {
        this.ratings = ratings;
    }
    public List<String> getServices() {
        return services;
    }
    public void setServices(List<String> services) {
        this.services = services;
    }
    public List<String> getType() {
        return type;
    }
    public void setType(List<String> type) {
        this.type = type;
    }
    public List<String> getPhotos() {
        return photos;
    }
    public void setPhotos(List<String> photos) {
        this.photos = photos;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }    
}
