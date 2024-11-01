import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, MenuItem, Button, Typography, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import './GetListed.css';
import axios from 'axios';
import Back from '../common/Back';
import img from "../images/pricing.jpg";

export default function GetListed() {

  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  useEffect(() => {
    const fadeIns = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    });

    fadeIns.forEach(fadeIn => observer.observe(fadeIn));
    return () => fadeIns.forEach(fadeIn => observer.unobserve(fadeIn));
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [venueName, setVenueName] = useState("");
  const [sportType, setSportType] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [bookingNumber, setBookingNumber] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/turfform/add', { name, email, venueName, sportType, contactNumber, bookingNumber, location, message })
      .then((res) => { console.log(res.data); })
      .catch((err) => { console.log(err); });
    window.location.reload();
  }

  return (
    <div>
      
      <Back name='List Your Turf In Arena' title='BE A PARTNER' cover={img} />

      <div className='journey-container container'>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <img 
            src='https://www.pngall.com/wp-content/uploads/1/Sports-PNG-Picture.png' 
            alt='Sports' 
            className='journey-image'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='h4' className='journey-heading'>
            The Journey of a Thousand Miles Begins with a Single Step
          </Typography>
          <Typography variant='h6' className='journey-subheading'>
            <Typography variant='h5'>Step into the future of sports partnerships. </Typography>
            <span className='highlight-red'> Innovate</span>, 
            <span className='highlight-black'> Collaborate</span>, 
            <span className='highlight-red'> Succeed</span>.
          </Typography>
          <Typography variant='body1' className='journey-description'>
            Join us and be a part of a growing community of sports enthusiasts. 
            Together, we can elevate your venue's visibility and success.
          </Typography>
        </Grid>
      </Grid>
    </div>

      <div className='intro1'>
        <h1>Get Connected in Easy Steps</h1>
        <br /><br />
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={3.5} className='fade-in'>
            <div className='step-logo-bg'>
              <img src="https://www.pikpng.com/pngl/b/282-2825751_png-file-svg-fill-in-form-icon-clipart.png" alt="Fill Out the Form" className="step-logo" />
            </div>
            <h4>Fill Out the Form</h4>
            <p>Provide your details and venue information to start the partnership process.</p>
          </Grid>
          <Grid item xs={12} sm={6} md={3.5} className='fade-in'>
            <div className='step-logo-bg'>
              <img src="https://img.icons8.com/material-rounded/96/000000/meeting.png" alt="Our Team Will Reach You" className="step-logo" />
            </div>
            <h4>Our Team Will Reach You</h4>
            <p>Our team will get in touch with you to discuss further details and next steps.</p>
          </Grid>
          <Grid item xs={12} sm={6} md={3.5} className='fade-in'>
            <div className='step-logo-bg'>
              <img src="https://img.icons8.com/?size=100&id=37965&format=png&color=000000" alt="Partner" className="step-logo" />
            </div>
            <h4>Partner with Arena</h4>
            <p>Complete the partnership process and start enjoying the benefits of partnering with us.</p>
          </Grid>
        </Grid>
      </div>

      <Container maxWidth="md" className="form-container" style={{ padding: '0 20px' }}>
        <div className="form-content">
          <form className="form-box" onSubmit={handleSubmit}>
          <h1>Partner with Us</h1>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} >
                <TextField 
                  label="Name" 
                  variant="outlined" 
                  className="form-textfield" 
                  fullWidth 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  label="Email" 
                  variant="outlined" 
                  className="form-textfield" 
                  fullWidth 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  label="Venue Name" 
                  variant="outlined" 
                  className="form-textfield" 
                  fullWidth 
                  value={venueName} 
                  onChange={(e) => setVenueName(e.target.value)} 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  label="Sport Type" 
                  variant="outlined" 
                  className="form-textfield" 
                  fullWidth 
                  value={sportType} 
                  onChange={(e) => setSportType(e.target.value)} 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  label="Contact Number" 
                  variant="outlined" 
                  className="form-textfield" 
                  fullWidth 
                  value={contactNumber} 
                  onChange={(e) => setContactNumber(e.target.value)} 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  label="Booking Number" 
                  variant="outlined" 
                  className="form-textfield" 
                  fullWidth 
                  value={bookingNumber} 
                  onChange={(e) => setBookingNumber(e.target.value)} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  label="Location" 
                  variant="outlined" 
                  className="form-textfield" 
                  fullWidth 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  label="Message" 
                  variant="outlined" 
                  multiline 
                  rows={4} 
                  className="form-textfield" 
                  fullWidth 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                />
              </Grid>
            </Grid>
            <button type='submit' className='hero-btn'>
                Submit
            </button>
          </form>
        </div>
      </Container>

      {/* <section className="lets-talk">
        <div className="container">
          <h1 className="title">Let's Talk!</h1>
          <p className="subtitle">Have any questions or concerns? Feel free to get in touch with us.</p>
          <Button variant="contained" className="btn-custom">Contact Us</Button>
        </div>
      </section> */}
    </div>
  );
}