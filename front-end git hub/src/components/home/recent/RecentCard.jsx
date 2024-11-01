import React, { useEffect, useState } from "react";
import { Grid, Card, CardMedia, CardContent, Typography, IconButton, CircularProgress, Autocomplete, Alert, TextField, InputAdornment, Button } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SearchIcon from '@mui/icons-material/Search';
import { fetchTurfs } from "./TurfService.jsx"; 
import axios from "axios";

const RecentCard = () => {
  const Districts = [
    { district: 'Coimbatore' },
    { district: 'Chennai' },
    { district: 'Madurai' },
    { district: 'Bangalore' },
    { district: 'Mumbai' },
    { district: 'Goa' },
  ];

  const districtProps = {
    options: Districts,
    getOptionLabel: (option) => option.district,
  };

  const Sports = [
    { sport: 'Football' },
    { sport: 'Cricket' },
    { sport: 'Basketball' },
    { sport: 'Tennis' },
    { sport: 'Volleyball' },
    { sport: 'Badminton' },
  ];

  const sportProps = {
    options: Sports,
    getOptionLabel: (option) => option.sport,
  };

  const [districtValue, setDistrictValue] = useState(null);
  const [sportType, setSportType] = useState(null);
  const [turfName, setTurfName] = useState("");
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTurfs = async () => {
      try {
        const data = await fetchTurfs();
        setTurfs(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load turfs.");
        setLoading(false);
      }
    };
    loadTurfs();
  }, []);

  const handleDistrictChange = (event, value) => {
    setDistrictValue(value);
  };

  const handleSportTypeChange = (event, value) => {
    setSportType(value);
  };

  const handleTurfNameChange = (event) => {
    setTurfName(event.target.value);
  };

  const handleGpsAccess = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const address = response.data.address;
          const district = address.county || address.city || address.state_district || address.town || address.village;
          console.log(response.data);
          
          const nearestDistrict = Districts.find(d => district && district.includes(d.district));
          if (nearestDistrict) {
            setDistrictValue(nearestDistrict);
          } else {
            setError("Your district is not in our predefined list.");
          }
        } catch (err) {
          setError("Failed to get district from GPS coordinates. Please try again later.");
        }
      }, (error) => {
        setError("Unable to access GPS. Please allow location access and try again.");
      });
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

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

  const filteredTurfs = turfs.filter(turf => {
    const districtMatches = districtValue ? turf.location === districtValue.district : true;
    const sportMatches = sportType ? (Array.isArray(turf.type) && turf.type.some(type => type === sportType.sport)) : true;
    const nameMatches = turfName ? turf.name.toLowerCase().includes(turfName.toLowerCase()) : true;
    return districtMatches && sportMatches && nameMatches;
  });

  return (
    <div className='content'>
      <Grid container alignItems="center" style={{ minHeight: '10vh' }}>
        <Grid item xs={12} sm={12} md={4}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Autocomplete
              {...districtProps}
              id="district"
              color="error"
              autoComplete
              includeInputInList
              value={districtValue}
              onChange={handleDistrictChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select City"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <LocationOnIcon />
                        {params.InputProps.startAdornment}
                      </>
                    ),                    
                  }}
                  style={{ width: '220px' }} 
                />
              )}
            />
            <>
              <Button onClick={handleGpsAccess} variant="outlined" color="error" style={{ marginLeft: 5 }}>
                <img src="https://img.icons8.com/?size=25&id=V84cvExSNtwW&format=png&color=000000" alt="GPS Icon" style={{ width: 25, height: 25 }} />
              </Button>
            </>
          </div> 
        </Grid>

        <Grid item xs={12} sm={12} md={3}>
          <Autocomplete
            {...sportProps}
            id="sportType"
            autoComplete
            color="error"
            includeInputInList
            value={sportType}
            onChange={handleSportTypeChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Sport"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <SportsBasketballIcon />
                      {params.InputProps.startAdornment}
                    </>
                  ),
                }}
                style={{ width: '220px' }} 
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={3}>
          <TextField
            label="Search by Turf Name"
            variant="outlined"
            color="error"
            value={turfName}
            onChange={handleTurfNameChange}
            style={{ width: '220px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={12} md={2}>
          <Typography variant="body1">
            <button className='btn3' style={{ backgroundColor: "#ee1714" }}>   {filteredTurfs.length} Turfs Found </button>
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {filteredTurfs.map((turf, index) => {
          console.log(turf);
          const { turfId, profilePic, category, address, name, price, type } = turf;
          return (
            <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
              <Link to={`/turf/${turfId}`} style={{ textDecoration: 'none' }}>
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
                      <Typography variant="body2">{type.map((typ,index)=>(<>{typ}{index<type.length-1?"•":""}</>))}</Typography>
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

export default RecentCard;
