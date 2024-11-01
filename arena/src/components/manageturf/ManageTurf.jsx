import React, { useContext, useState } from 'react';
import { TextField, Button, Grid,Box } from '@mui/material';
import axios from 'axios';
import { MyContext } from '../context/MyContext';
import './ManageTurf.css';

export default function ManageTurf() {
  const { turf, setTurf } = useContext(MyContext);
  const [formData, setFormData] = useState(turf);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === 'services' || name === 'type' || name === 'photos'
        ? value.split(',').map(item => item.trim())  
        : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/turf/update/${formData.turfId}`, formData); 
      setTurf(formData);
      alert('Turf updated successfully!');
    } catch (error) {
      console.error('Error updating turf:', error);
      alert('Failed to update turf. Please try again.');
    }
  };

  return (
    <Box className="form-container">
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
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              className="submit-button"
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
