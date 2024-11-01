package com.example.turfbookingbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.turfbookingbackend.model.LikedTurf;

@Repository
public interface LikedTurfRepository extends JpaRepository<LikedTurf, Long> {
    List<LikedTurf> findByUserId(Long userId);
}
