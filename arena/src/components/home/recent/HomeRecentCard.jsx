import React, { useEffect, useState } from "react";
import { Grid, Card, CardMedia, CardContent, Typography, IconButton, CircularProgress, Alert, Autocomplete, TextField } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite'; // Import for the heart icon
import { Link } from "react-router-dom";
import { fetchTurfs } from "./TurfService"; // Service to fetch turfs data
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';


const HomeRecentCard = () => {

  
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTurfs = async () => {
      try {
        const turfsData = await fetchTurfs();
        setTurfs(turfsData);
      } catch (err) {
        setError("Failed to load turfs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadTurfs();
  }, []);


  if (loading) {
    return (
      <div className="loading-screen-container">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Alert severity="error" className="mb-6">
          {error}
        </Alert>
      </div>
    );
  }

  
  return (
    <div className='content'>

      <Grid container spacing={2}>
        {turfs.slice(turfs.length-6,turfs.length).map((turf, index) => {
          const { profilePic, category, address, name, price, type } = turf; 
          return (
            <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
              <Link to={`/turf/${turf.turfId}`} style={{ textDecoration: 'none' }}>
                <Card className='box shadow'>
                  <CardMedia
                    component="img"
                    height="200"
                    image={profilePic}
                    alt={name}
                  />
                  <CardContent>
                    <div className='category flex'>
                      <Typography
                        variant="body2"
                        style={{
                          background: category === "Just In" ? "#25b5791a" : "#ff98001a",
                          color: category === "Just In" ? "#25b579" : "#ff9800",
                          padding: '2px 5px',
                          borderRadius: '5px'
                        }}
                      >
                        {category}
                      </Typography>
                      <IconButton>
                        <FavoriteIcon />
                      </IconButton>
                    </div>
                    <Typography variant="h6">{name}</Typography>
                    <Typography variant="body2">
                      <i className='fa fa-location-dot'></i> {address}
                    </Typography>
                    <div className='button flex'>
                      <Typography variant="body1">
                        <button className='btn2' style={{ backgroundColor: "#ee1714" }}>{price}</button> <label>/hr</label>
                      </Typography>
                      <Typography variant="body2">{type}</Typography>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default HomeRecentCard;
