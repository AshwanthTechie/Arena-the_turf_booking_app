import React, { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../context/MyContext'; // Adjust the import path as needed
import '../login/Login.css';

export default function TurfOwnerLogin() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const {turf,setTurf, setLoginStatus, setTurfLoginStatus} = useContext(MyContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handlesubmit = async () => {
    try {
      const response = await axios.get("http://localhost:8080/turf/get");
      const turf = response.data.find(obj => obj.email === email);
      if (turf) {
        if (turf.password === password) {
          console.log("Login Success");
          setLoginStatus(false);
          setTurfLoginStatus(true);
          setTurf(turf);
          console.log(turf);
          navigate(`/`);
        } else {
          console.log("Incorrect Password");
          alert("Incorrect Password");
        }
      } else {
        alert("Email Doesn't Exist.");
      }
    } catch (error) {
      console.error("There was an error logging in!", error);
    }
  };

  return (
    <div className='LogBody'>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={5}>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className='login'>
              <h2>Login</h2>
              <TextField onChange={handleEmail} type='email' label="Email" variant="outlined" color='error' required />
              <br /><br />
              <TextField onChange={handlePassword} type='password' label="Password" variant="outlined" color='error' required />
              <br /><br />
              <FormControlLabel control={<Checkbox />} label="Remember Me." />
              <br /><br />
              <Box display="flex" justifyContent="center">
                <Button
                  onClick={handlesubmit}
                  variant="contained"
                  color="error"
                >
                  Login
                </Button>
              </Box>
              <br /><br />
              
              <Link to="/turfowners"><h6>Forgot Password</h6></Link>
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
