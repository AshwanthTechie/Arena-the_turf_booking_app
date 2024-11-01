package com.example.turfbookingbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.turfbookingbackend.model.Turf;

public interface TurfRepo extends JpaRepository<Turf,Long>{
    
}
