package com.example.turfbookingbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.turfbookingbackend.model.Booking;
import com.example.turfbookingbackend.model.BookingDetailResponse;
import com.example.turfbookingbackend.service.BookingService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"https://dharaneesh-v.github.io/","http://localhost:3000/"}) 
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping("/get/bookingids/user/{userId}")
    public List<Long> getBookingIdsByUserId(@PathVariable("userId") Long userId) {
        return bookingService.getBookingIdsByUserId(userId);
    }

    @GetMapping("/get/bookingids/{turfId}")
    public List<Long> getBookingIdsByTurfId(@PathVariable("turfId") Long turfId) {
        return bookingService.getBookingIdsByTurfId(turfId);
    }

    @GetMapping("/get/bookingdetail/{bookingId}")
    public BookingDetailResponse getBookingDetails(@PathVariable Long bookingId) {
        return bookingService.getBookingDetails(bookingId);
    }

    @GetMapping("/turf/{bookingId}/bookings")
    public ResponseEntity<List<Booking>> getBookingsForTurf(@PathVariable Long bookingId, @RequestParam String date) {
        List<Booking> bookings = bookingService.getBookingsForTurf(bookingId, date);
        return ResponseEntity.ok(bookings);
    }

    @PostMapping("/bookings")
    public ResponseEntity<String> createBooking(@RequestBody Booking booking) {
        try {
            bookingService.saveBooking(booking);
            return new ResponseEntity<>("Booking saved successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to save booking", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/bookings/update/{bookingId}")
    public Booking updateBooking(@PathVariable Long bookingId,@RequestBody Booking booking)
    {
        return bookingService.updateBooking(bookingId,booking);
    }
}
