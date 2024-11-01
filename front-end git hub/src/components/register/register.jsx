import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css';

const defaultTheme = createTheme();

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState(""); // State to manage email error

  const handleSubmit = (event) => {
    event.preventDefault();
    if (emailError) {
      alert("Please fix the errors before submitting.");
      return;
    }
    handlesignup();
  };

  const handlesignup = async () => {
    try {
      await axios.post("http://localhost:8080/user/add", { name, phone, email, password });
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8080/user/check-email?email=${email}`);
      if (response.data) {
        setEmailError("Email already exists");
      } else {
        setEmailError(""); // Clear error if email does not exist
      }
    } catch (err) {
      console.error("Error checking email:", err);
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    checkEmailExists(emailValue);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className='RegisterBody'>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box className='register'>
              <Typography component="h1" variant="h5">
                <h3>Sign up</h3>
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="phone"
                      label="Phone Number"
                      name="phone"
                      autoComplete="family-name"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={handleEmailChange} // Use the new email change handler
                      error={Boolean(emailError)} // Show error if email exists
                      helperText={emailError} // Display error message
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  className='btn-register'
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to={"/login"}>
                      <h6>Already have an account? Sign in</h6>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}
