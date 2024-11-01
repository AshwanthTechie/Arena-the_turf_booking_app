package com.example.turfbookingbackend.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "booking_detail")
public class BookingDetailResponse {
    @Id
    public Long bookingId;
    private String date;
    private String fromTime;
    private String toTime;
    private String paymentOption;
    private Double totalPrice;
    private String paymentId;

    private String userName;
    private String userEmail;
    private String userPhone;

    private String turfName;
    private String turfAddress;
    private String turfLocation;
    private String turfPhone;
    private String turfEmail;
    private String turfProfilePic;
    private String turfTimings;
    private String turfDescription;
    private Double turfRatings;
    private List<String> turfServices;
    private List<String> turfTypes;
    private List<String> turfPhotos;


    public Long getBookingId() {
        return bookingId;
    }
    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }
    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }
    public String getFromTime() {
        return fromTime;
    }
    public void setFromTime(String fromTime) {
        this.fromTime = fromTime;
    }
    public String getToTime() {
        return toTime;
    }
    public void setToTime(String toTime) {
        this.toTime = toTime;
    }
    public String getPaymentOption() {
        return paymentOption;
    }
    public void setPaymentOption(String paymentOption) {
        this.paymentOption = paymentOption;
    }
    public Double getTotalPrice() {
        return totalPrice;
    }
    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }
    public String getPaymentId() {
        return paymentId;
    }
    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public String getUserEmail() {
        return userEmail;
    }
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
    public String getUserPhone() {
        return userPhone;
    }
    public void setUserPhone(String userPhone) {
        this.userPhone = userPhone;
    }
    public String getTurfName() {
        return turfName;
    }
    public void setTurfName(String turfName) {
        this.turfName = turfName;
    }
    public String getTurfLocation() {
        return turfLocation;
    }
    public void setTurfLocation(String turfLocation) {
        this.turfLocation = turfLocation;
    }
    public String getTurfPhone() {
        return turfPhone;
    }
    public void setTurfPhone(String turfPhone) {
        this.turfPhone = turfPhone;
    }
    public String getTurfEmail() {
        return turfEmail;
    }
    public void setTurfEmail(String turfEmail) {
        this.turfEmail = turfEmail;
    }
    public String getTurfProfilePic() {
        return turfProfilePic;
    }
    public void setTurfProfilePic(String turfProfilePic) {
        this.turfProfilePic = turfProfilePic;
    }
    public String getTurfTimings() {
        return turfTimings;
    }
    public void setTurfTimings(String turfTimings) {
        this.turfTimings = turfTimings;
    }
    public String getTurfDescription() {
        return turfDescription;
    }
    public void setTurfDescription(String turfDescription) {
        this.turfDescription = turfDescription;
    }
    public Double getTurfRatings() {
        return turfRatings;
    }
    public void setTurfRatings(Double turfRatings) {
        this.turfRatings = turfRatings;
    }
    public List<String> getTurfServices() {
        return turfServices;
    }
    public void setTurfServices(List<String> turfServices) {
        this.turfServices = turfServices;
    }
    public List<String> getTurfTypes() {
        return turfTypes;
    }
    public void setTurfTypes(List<String> turfTypes) {
        this.turfTypes = turfTypes;
    }
    public List<String> getTurfPhotos() {
        return turfPhotos;
    }
    public void setTurfPhotos(List<String> turfPhotos) {
        this.turfPhotos = turfPhotos;
    }
    public String getTurfAddress() {
        return turfAddress;
    }
    public void setTurfAddress(String turfAddress) {
        this.turfAddress = turfAddress;
    }
    
}
