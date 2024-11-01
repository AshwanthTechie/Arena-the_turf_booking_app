package com.example.turfbookingbackend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.turfbookingbackend.model.User;
import com.example.turfbookingbackend.service.UserService;

@RestController
@CrossOrigin(origins = {"https://dharaneesh-v.github.io/","http://localhost:3000/"}) 
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/add")
    public User postUser(@RequestBody User user)
    {
        return userService.postUser(user);
    }

    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        boolean exists = userService.emailExists(email);
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/get")
    public List<User> getUsers()
    {
        return userService.getUsers();
    }

    @GetMapping("/get/{id}")
    public Optional<User> getUser(@PathVariable Long id)
    {
        return userService.getUser(id);
    }

    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable Long id,@RequestBody User user)
    {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("delete/{id}")
    public Boolean deleteUser(@PathVariable Long id)
    {
        return userService.deleteUser(id);
    }
}
