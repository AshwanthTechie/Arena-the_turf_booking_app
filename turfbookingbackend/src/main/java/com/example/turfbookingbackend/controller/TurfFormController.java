package com.example.turfbookingbackend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.turfbookingbackend.model.TurfForm;
import com.example.turfbookingbackend.service.TurfFormService;

@RestController
@RequestMapping("/turfform")
@CrossOrigin(origins = {"https://dharaneesh-v.github.io/","http://localhost:3000/"}) 
public class TurfFormController {
    @Autowired
    TurfFormService turfService;

    @PostMapping("/add")
    public TurfForm postUser(@RequestBody TurfForm turf)
    {
        return turfService.postTurf(turf);
    }

    
    @GetMapping("/get")
    public List<TurfForm> getTurfs()
    {
        return turfService.getTurfs();
    }

    @GetMapping("/get/{turfFormId}")
    public Optional<TurfForm> getTurf(@PathVariable int turfFormId)
    {
        return turfService.getTurf(turfFormId);
    }

    @PutMapping("/update/{turfFormId}")
    public TurfForm updateTurf(@PathVariable int turfFormId,@RequestBody TurfForm turf)
    {
        return turfService.updateTurf(turfFormId, turf);
    }

    @DeleteMapping("delete/{turfFormId}")
    public Boolean deleteTurf(@PathVariable int turfFormId)
    {
        return turfService.deleteTurf(turfFormId);
    }
}
