package com.example.turfbookingbackend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.turfbookingbackend.model.TurfForm;
import com.example.turfbookingbackend.repository.TurfFormRepo;

@Service
public class TurfFormService {
    @Autowired
    TurfFormRepo turfRepo;

    public TurfForm postTurf(TurfForm turf)
    {
        return turfRepo.save(turf);
    }

    public Optional<TurfForm> getTurf(int id)
    {
        return turfRepo.findById(id);
    }

    public List<TurfForm> getTurfs()
    {
        return turfRepo.findAll();
    }

    public TurfForm updateTurf(int id,TurfForm turf)
    {
        TurfForm avail = turfRepo.findById(id).orElse(null);
        if(avail!=null)
        {
            avail.setName(turf.getName());
            avail.setEmail(turf.getEmail());
            avail.setVenueName(turf.getVenueName());
            avail.setSportsType(turf.getSportsType());
            avail.setContactNumber(turf.getContactNumber());
            avail.setBookingNumber(turf.getBookingNumber());
            avail.setLocation(turf.getLocation());
            avail.setMessage(turf.getMessage());
            return turfRepo.saveAndFlush(avail);
        }
        else
            return null;
    }

    public Boolean deleteTurf(int id)
    {
        turfRepo.deleteById(id);
        return true;
    }
}
