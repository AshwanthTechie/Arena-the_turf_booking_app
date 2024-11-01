package com.example.turfbookingbackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "liked_turfs")
public class LikedTurf {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "turf_id", nullable = false)
    private Long turfId;

    public LikedTurf() {}

    public LikedTurf(User user, Long turfId) {
        this.user = user;
        this.turfId = turfId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getTurfId() {
        return turfId;
    }

    public void setTurfId(Long turfId) {
        this.turfId = turfId;
    }
}
