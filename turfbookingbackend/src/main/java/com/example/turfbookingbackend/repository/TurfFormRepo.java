package com.example.turfbookingbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.turfbookingbackend.model.TurfForm;

public interface TurfFormRepo extends JpaRepository<TurfForm,Integer>{
    
}
