import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, Grid, FormControl } from '@mui/material';
import './AddTurf.css';
import axios from 'axios';

const AddTurf = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
}, []);


  const [formData, setFormData] = useState({
    turfId: '',
    name: '',
    address: '',
    location: '',
    phone: '',
    price: '',
    email: '',
    profilePic: '',
    timings: '',
    description: '',
    ratings: 0,
    services: [],
    type: [],
    photos: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === 'services' || name === 'type' || name === 'photos'
        ? value.split(',').map(item => item.trim())  
        : value,
    });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const password = prompt("Enter password to add Turf");
        if(password==="arena@123"){
        const response = await axios.post('http://localhost:8080/turf/add', formData);
        alert("Turf added Successfully.");
        window.location.reload();
        }
        else
        alert("Turf Not Added");
    }
    catch (error) {
        console.error('There was an error creating the turf!', error);
    }
};


  return (
    <Box className="form-container">
      <Typography variant="h4" className="form-title">
        Add Turf
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              className="form-group"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              className="form-group"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              className="form-group"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              className="form-group"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              className="form-group"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              className="form-group"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              className="form-group"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Profile Pic URL"
              name="profilePic"
              value={formData.profilePic}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              className="form-group"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Timings"
              name="timings"
              value={formData.timings}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              className="form-group"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              className="form-group"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Ratings"
              name="ratings"
              value={formData.ratings}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              className="form-group"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Services (comma-separated)"
              name="services"
              value={formData.services.join(', ')}  
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              className="form-group"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Type (comma-separated)"
              name="type"
              value={formData.type.join(', ')} 
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              className="form-group"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Photos (comma-separated URLs)"
              name="photos"
              value={formData.photos.join(', ')}  
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              className="form-group"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              className="submit-button"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddTurf;
