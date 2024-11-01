package com.example.turfbookingbackend.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.turfbookingbackend.model.Booking;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Long>{
    List<Booking> findByTurfIdAndDate(Long turfId, String date);

    @Query("SELECT b.bookingId FROM Booking b WHERE b.userId = :userId")
    List<Long> findBookingIdsByUserId(@Param("userId") Long userId);

    @Query("SELECT b.bookingId FROM Booking b WHERE b.turfId = :turfId")
    List<Long> findBookingIdsByTurfId(@Param("turfId") Long turfId);
}
