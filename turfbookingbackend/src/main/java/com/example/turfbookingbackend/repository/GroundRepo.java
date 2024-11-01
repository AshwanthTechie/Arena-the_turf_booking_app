package com.example.turfbookingbackend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.turfbookingbackend.model.Ground;

@Repository
public interface GroundRepo extends JpaRepository<Ground,Long>{

}
