import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Container, Box, TextField, Button } from "@mui/material";
import axios from 'axios';

export default function TurfOwners() {

  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  const [turfId, setTurfId] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchBookings = async () => {
    setLoading(true);
    try {
      // Fetch booking IDs for the given turfId
      const bookingIdsResponse = await axios.get(`http://localhost:8080/api/get/bookingids/${turfId}`);
      const bookingIds = bookingIdsResponse.data;

      // Fetch details for each booking ID
      const bookingDetailsPromises = bookingIds.map(id =>
        axios.get(`http://localhost:8080/api/get/bookingdetail/${id}`)
      );
      const bookingDetailsResponses = await Promise.all(bookingDetailsPromises);

      // Update the bookings state with the fetched details
      setBookings(bookingDetailsResponses.map(response => response.data));
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <TextField
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
      </Button>

      {bookings.map((booking, index) => (
        <Card
          key={index}
          style={{
            marginBottom: "20px",
            width: "100%",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
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
