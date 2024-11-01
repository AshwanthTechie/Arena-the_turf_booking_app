package com.example.turfbookingbackend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.turfbookingbackend.model.Turf;
import com.example.turfbookingbackend.service.TurfService;

@RestController
@RequestMapping("/turf")
@CrossOrigin(origins = {"https://dharaneesh-v.github.io/","http://localhost:3000/"}) 
public class TurfController {
    @Autowired
    TurfService turfService;

    @PostMapping("/add")
    public Turf addTurf(@RequestBody Turf turf)
    {
        return turfService.addTurf(turf);
    }

    @GetMapping("/get/{turfId}")
    public Optional<Turf> getTurf(@PathVariable Long turfId)
    {
        return turfService.getTurf(turfId);
    }

    @GetMapping("/get")
    public List<Turf> getTurfs()
    {
        return turfService.getTurfs();
    }

   @PutMapping("/update/{turfId}")
public ResponseEntity<?> updateTurf(@PathVariable Long turfId, @RequestBody Turf turf) {
    try {
        Turf updatedTurf = turfService.updateTurf(turfId, turf);
        return new ResponseEntity<>(updatedTurf, HttpStatus.OK);
    } catch (RuntimeException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    } catch (Exception e) {
        return new ResponseEntity<>("An error occurred while updating the turf", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}


    @DeleteMapping("/delete/{turfId}")
    public Boolean deleteTurf(@PathVariable Long turfId)
    {
        return turfService.deleteTurf(turfId);
    }
}
