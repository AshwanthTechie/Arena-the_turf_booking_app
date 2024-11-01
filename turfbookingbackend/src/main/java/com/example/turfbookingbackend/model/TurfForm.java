package com.example.turfbookingbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "turfs_Form")
public class TurfForm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int turfFormId;
    String name,email,venueName,sportsType,contactNumber,bookingNumber,location,message;
    public int getTurfFormId() {
        return turfFormId;
    }
    public void setTurfId(int turfFormId) {
        this.turfFormId = turfFormId;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getVenueName() {
        return venueName;
    }
    public void setVenueName(String venueName) {
        this.venueName = venueName;
    }
    public String getSportsType() {
        return sportsType;
    }
    public void setSportsType(String sportsType) {
        this.sportsType = sportsType;
    }
    public String getContactNumber() {
        return contactNumber;
    }
    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }
    public String getBookingNumber() {
        return bookingNumber;
    }
    public void setBookingNumber(String bookingNumber) {
        this.bookingNumber = bookingNumber;
    }
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }

    

}
