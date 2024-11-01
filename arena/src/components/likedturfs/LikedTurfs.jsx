import React, { useEffect, useState, useContext } from "react";
import { Grid, Card, CardMedia, CardContent, Typography, CircularProgress, Alert, Button } from "@mui/material";
import axios from "axios";
import { MyContext } from "../context/MyContext";

const LikedTurfs = () => {
  const { userId } = useContext(MyContext); // Get userId from context
  const [likedTurfs, setLikedTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikedTurfs = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/liked-turfs/liked-turfs/${userId}`);
        setLikedTurfs(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load liked turfs.");
        setLoading(false);
        console.error(err); // Log the error to see what went wrong
      }
    };
    fetchLikedTurfs();
  }, [userId]);

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
    <div className="content">
      <Grid container spacing={2}>
        {likedTurfs.map((turf) => {
          const { turfId, profilePic, name, price, address, type } = turf;

          return (
            <Grid item xs={12} sm={6} md={4} lg={4} key={turfId}>
              <Card className="box shadow">
                <CardMedia
                  component="img"
                  height="200"
                  image={profilePic || "default-image-url.jpg"} // Use a fallback image if profilePic is undefined
                  alt={name}
                />
                <CardContent>
                  <Typography variant="h6">{name}</Typography>
                  <Typography variant="body2">
                    <i className="fa fa-location-dot"></i> {address}
                  </Typography>
                  <div className="button flex">
                    <Typography variant="body1">
                      <Button variant="contained" color="secondary">
                        {price}
                      </Button> 
                      <label>/hr</label>
                    </Typography>
                    <Typography variant="body2">
                      {type.map((typ, index) => (
                        <span key={index}>
                          {typ}{index < type.length - 1 ? "•" : ""}
                        </span>
                      ))}
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
};

export default LikedTurfs;
