    package com.example.turfbookingbackend.controller;

    import java.util.List;

    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.web.bind.annotation.*;
    import com.example.turfbookingbackend.model.LikedTurf;
    import com.example.turfbookingbackend.model.User;
    import com.example.turfbookingbackend.service.LikedTurfService;
    import com.example.turfbookingbackend.service.UserService;

    @RestController
    @RequestMapping("/liked-turfs")
    @CrossOrigin(origins = {"https://dharaneesh-v.github.io/","http://localhost:3000/"}) 
    public class LikedTurfController {

        @Autowired
        LikedTurfService likedTurfService;

        @Autowired
        UserService userService;

        @PostMapping("/add")
        public LikedTurf addLikedTurf(@RequestBody LikedTurfRequest request) {
            User user = userService.getUser(request.getUserId()).orElseThrow();
            LikedTurf likedTurf = new LikedTurf(user, request.getTurfId());
            return likedTurfService.saveLikedTurf(likedTurf);
        }
        @GetMapping("/liked-turfs/{userId}")
        public List<LikedTurf> getLikedTurfsByUserId(@PathVariable Long userId) {
            return likedTurfService.getLikedTurfsByUserId(userId);
        }
    }

    class LikedTurfRequest {
        private Long userId;
        private Long turfId;

        // Getters and Setters
        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public Long getTurfId() {
            return turfId;
        }

        public void setTurfId(Long turfId) {
            this.turfId = turfId;
        }
    }
