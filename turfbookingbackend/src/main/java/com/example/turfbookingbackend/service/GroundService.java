package com.example.turfbookingbackend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.turfbookingbackend.model.Ground;
import com.example.turfbookingbackend.repository.GroundRepo;

@Service
public class GroundService {
    @Autowired
    GroundRepo groundRepo;

    public Ground addGround(Ground ground)
    {
        return groundRepo.save(ground);
    }

    public List<Ground> getGrounds()
    {
        return groundRepo.findAll();
    }

    public Optional<Ground> getGround(Long groundId){
        return groundRepo.findById(groundId);
    }

    public Ground updateGround(Long groundId, Ground ground)
    {
        Ground avail = groundRepo.findById(groundId).orElse(null);
        if(avail!=null)
        {
            avail.setProfilePic(ground.getProfilePic());
            avail.setName(ground.getName());
            avail.setAddress(ground.getAddress());
            avail.setType(ground.getType());
            return groundRepo.saveAndFlush(avail);
        }
        else return null;
    }

    public boolean deleteGround(Long groundId)
    {
        try{
            groundRepo.deleteById(groundId);
            return true;
        }
        catch(Exception e){
            return false;
        }
    }
}
