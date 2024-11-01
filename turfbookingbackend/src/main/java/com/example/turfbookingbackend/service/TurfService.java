package com.example.turfbookingbackend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.turfbookingbackend.model.Turf;
import com.example.turfbookingbackend.repository.TurfRepo;

@Service
public class TurfService {
    @Autowired
    TurfRepo turfRepo;

    public Turf addTurf(Turf turf)
    {
        return turfRepo.save(turf);
    }

    public Optional<Turf> getTurf(Long turfId)
    {
        return turfRepo.findById(turfId);
    }

    public List<Turf> getTurfs()
    {
        return turfRepo.findAll();
    }

    public Turf updateTurf(Long turfId, Turf turf) {
        Turf avail = turfRepo.findById(turfId).orElse(null);
        if (avail != null) {
            avail.setName(turf.getName());
            avail.setAddress(turf.getAddress());
            avail.setLocation(turf.getLocation());
            avail.setPhone(turf.getPhone());
            avail.setPrice(turf.getPrice());
            avail.setEmail(turf.getEmail());
            avail.setProfilePic(turf.getProfilePic());
            avail.setTimings(turf.getTimings());
            avail.setRatings(turf.getRatings());
            avail.setDescription(turf.getDescription());
            avail.setServices(turf.getServices());
            avail.setType(turf.getType());
            avail.setPhotos(turf.getPhotos());
            return turfRepo.saveAndFlush(avail);
        } else {
            throw new RuntimeException("Turf not found with ID: " + turfId);
        }
    }
    

    public Boolean deleteTurf(Long turfId)
    {
        try{
            turfRepo.deleteById(turfId);
            return true;
        }
        catch(Exception e)
        {
            return false;
        }
    }
}
