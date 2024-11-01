package com.example.turfbookingbackend.model;
import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "grounds")
public class Ground {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long groundId;
    String profilePic, name, address;
    List<String> type;
    
    public Long getGroundId() {
        return groundId;
    }
    public void setGroundId(Long groundId) {
        this.groundId = groundId;
    }
    public String getProfilePic() {
        return profilePic;
    }
    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public List<String> getType() {
        return type;
    }
    public void setType(List<String> type) {
        this.type = type;
    }
}
