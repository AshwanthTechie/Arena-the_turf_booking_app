package com.example.turfbookingbackend.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.turfbookingbackend.model.Ground;
import com.example.turfbookingbackend.service.GroundService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin(origins = {"https://dharaneesh-v.github.io/","http://localhost:3000/"}) 
@RequestMapping("/ground")
public class GroundController {
    @Autowired
    GroundService groundService;

    @PostMapping("/add")
    public Ground addGround(@RequestBody Ground ground) {
        
        return groundService.addGround(ground);
    }
    
    @GetMapping("/get/{groundId}")
    public Optional<Ground> getGround(@PathVariable Long groundId)
    {
        return groundService.getGround(groundId);
    }
    
    @GetMapping("/get")
    public List<Ground> getGrounds()
    {
        return groundService.getGrounds();
    }

    @PutMapping("/update/{groundId}")
    public Ground updateGround(@PathVariable Long groundId,@RequestBody Ground ground)
    {
        return groundService.updateGround(groundId, ground);
    }

    @DeleteMapping("/delete/{groundId}")
    public boolean deleteGround(@PathVariable Long groundId)
    {
        return groundService.deleteGround(groundId);
    }
}
