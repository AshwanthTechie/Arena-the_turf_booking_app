import React, { useState, useEffect } from "react";
import { Grid, Card, CardMedia, CardContent, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";

export default function Ground() {
    const [grounds, setGrounds] = useState([]);
      
    useEffect(() => {
      window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchGrounds = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/ground/get`);
          const data = await response.data;
          console.log(data);
          setGrounds(data);
        } catch (error) {
          console.error("Failed to fetch grounds", error);
        }
      };

      fetchGrounds();
  }, []);

  

  if (!grounds) {
    return <div>Loading...</div>; // Or some loading spinner
  }

  return (
    <div className="container">
    <Grid container style={{display:"flex", alignItems:"center", justifyContent:"center"}} spacing={2} >
      {grounds.map((ground, index) => {
        const { groundId, profilePic, name, address, type } = ground;
        return (
          <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
            
              <Card className='box shadow'>
              <CardMedia
    component="img"
    height="200"
    image={profilePic}
    alt={name}
    style={{
      objectFit: 'cover', 
      width: '100%', 
      height: '290px', 
    }}
  />
                <CardContent>
                  <div className='category flex'>
                    <IconButton>
                      <FavoriteIcon />
                    </IconButton>
                  </div>
                  <Typography variant="h6">{name}</Typography>
                  <Typography variant="body2">
                    <i className='fa fa-location-dot'></i> {address}
                  </Typography>
                  <Typography variant="body1">
                        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer">
                        <button className='btn2' style={{ backgroundColor: "#ee1714" }}>
                  <span className="truncate">View on Map</span>
                        </button>
                        </a>
                </Typography>
                  <div className='button flex'>
                    <Typography variant="body2">
                      {type.map((typ, index) => (<>{typ}{index < type.length - 1 ? "•" : ""}</>))}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
          </Grid>
        );
      })}
    </Grid>
    </div>
  );
}
