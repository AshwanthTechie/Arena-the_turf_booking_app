package com.example.turfbookingbackend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.turfbookingbackend.model.User;
import com.example.turfbookingbackend.repository.UserRepo;

@Service
public class UserService {
    @Autowired
    UserRepo userRepo;

    public User postUser(User user)
    {
        return userRepo.save(user);
    }

    public boolean emailExists(String email) {
        return userRepo.existsByEmail(email);
    }

    public Optional<User> getUser(Long id)
    {
        return userRepo.findById(id);
    }

    public List<User> getUsers()
    {
        return userRepo.findAll();
    }

    public User updateUser(Long id,User user)
    {
        User avail = userRepo.findById(id).orElse(null);
        if(avail!=null)
        {
            avail.setName(user.getName());
            avail.setEmail(user.getEmail());
            avail.setPhone(user.getPhone());
            avail.setPassword(user.getPassword());
            return userRepo.saveAndFlush(avail);
        }
        else
            return null;
    }

    public Boolean deleteUser(Long id)
    {
        userRepo.deleteById(id);
        return true;
    }
}
