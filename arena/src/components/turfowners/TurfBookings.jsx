import React, { useContext, useEffect, useState } from "react";
import { Card, CardContent, Typography, Container, Box, TextField, Button } from "@mui/material";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { MyContext } from "../context/MyContext";

export default function TurfBookingss() {

  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  const {turf , setTurf} = useContext(MyContext);

  const {turfId} = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputturfId,setInputTurfId] = useState(turfId || "");

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        
        const bookingIdsResponse = await axios.get(`http://localhost:8080/api/get/bookingids/user/${inputturfId}`);
        const bookingIds = bookingIdsResponse.data;

        
        const bookingDetailsPromises = bookingIds.map(id =>
          axios.get(`http://localhost:8080/api/get/bookingdetail/${id}`)
        );
        const bookingDetailsResponses = await Promise.all(bookingDetailsPromises);

        setBookings(bookingDetailsResponses.map(response => response.data));

        // console.log(bookings);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
      setLoading(false);
    };

    fetchBookings();
  }); 

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      {/* <TextField
        label="Enter Turf ID"
        variant="outlined"
        value={turfId}
        onChange={(e) => setTurfId(e.target.value)}
        style={{ marginBottom: "20px", width: "100%" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleFetchBookings}
        disabled={loading}
        style={{ marginBottom: "20px" }}
      >
        {loading ? "Loading..." : "Fetch Bookings"}
      </Button> */}

      {bookings.map((booking, index) => (
        <Card
          key={index}
          style={{
            marginBottom: "20px",
            width: "100%",
            backgroundColor: "#f9f9f9",
            boxShadow: booking.paymentOption==='advance'?"0 4px 4px yellow":"0 4px 8px green",
            borderRadius: "10px",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              style={{
                fontWeight: "bold",
                color: "#333",
                borderBottom: "2px solid #00796b",
                paddingBottom: "5px",
              }}
            >
              Booking ID: {booking.bookingId}
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom="10px"
            >
              <Typography variant="body1">
                Payment ID: {booking.paymentId}
              </Typography>
              <Typography variant="body1">
                Date: {booking.date}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="right"
              marginBottom="5px"
            >
              <Typography variant="body1">
                Time: {booking.fromTime} - {booking.toTime}
              </Typography>
              <Typography variant="body1">
                Payment Option: {booking.paymentOption}
              </Typography>
              <Typography variant="body1">
                Amount Paid: ₹.{booking.totalPrice}
              </Typography>
            </Box>
            <Box marginBottom="10px">
              <Typography variant="body1">
                User Name: {booking.userName}
              </Typography>
              <Typography variant="body1">
                User Email: {booking.userEmail}
              </Typography>
              <Typography variant="body1">
                User Phone: {booking.userPhone}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
