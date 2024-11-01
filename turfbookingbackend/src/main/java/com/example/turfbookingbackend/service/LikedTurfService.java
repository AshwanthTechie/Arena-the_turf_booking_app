package com.example.turfbookingbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.turfbookingbackend.model.LikedTurf;
import com.example.turfbookingbackend.repository.LikedTurfRepository;

@Service
public class LikedTurfService {

    @Autowired
    LikedTurfRepository likedTurfRepository;

    public LikedTurf saveLikedTurf(LikedTurf likedTurf) {
        return likedTurfRepository.save(likedTurf);
    }

    public List<LikedTurf> getLikedTurfsByUserId(Long userId) {
        return likedTurfRepository.findByUserId(userId);
    }
}
