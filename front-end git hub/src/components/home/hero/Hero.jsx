import React from "react";
import Heading from "../../common/Heading";
import "./hero.css";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

const Hero = () => {
  return (
    <section className='hero'>
      <div className='container'>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item sm={12}>
            <Heading title='Step Inside & Score Big ' subtitle='Discover new & featured turfs located in your local city.' />
          </Grid>
          <div className='hero-buttons-container'>
            <Link to="/booking">
            <button className='hero-btn'>
              <i className='fa fa-sign-out'></i> Book Now
            </button>
            </Link>
            <Link to="getlist">
            <button className='hero-btn'>
              <i className='fa fa-sign-out'></i> Get Listed
            </button>
            </Link>
          </div>
        </Grid>
      </div>
    </section>
  );
};

export default Hero;
