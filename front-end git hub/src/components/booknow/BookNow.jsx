import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Typography, Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import axios from 'axios';
import './BookNow.css';
import { fetchTurfById } from '../home/recent/TurfService.jsx';
import { MyContext } from '../context/MyContext.js';

const generateTimeSlots = (startHour, endHour, intervalMinutes, currentTime, selectedDate) => {
  const slots = [];
  let currentSlot = dayjs(selectedDate).startOf('day').hour(startHour);
  const endTime = dayjs(selectedDate).startOf('day').hour(endHour).minute(59);

  while (currentSlot.isBefore(endTime)) {
    if (selectedDate.isSame(dayjs(), 'day') && currentSlot.isBefore(currentTime, 'minute')) {
      currentSlot = currentSlot.add(intervalMinutes, 'minute');
      continue;
    }
    slots.push(currentSlot.format('HH:mm'));
    currentSlot = currentSlot.add(intervalMinutes, 'minute');
  }

  return slots;
};

const BookNow = () => {
  const { id } = useParams();
  const {user} = useContext(MyContext);

  const [formData, setFormData] = useState({
    date: dayjs(),
    fromTime: null,
    toTime: null,
    paymentOption: 'advance',
  });
  const [timeSlots, setTimeSlots] = useState([]);
  const [turf, setTurf] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const currentTime = dayjs();
    const selectedDate = formData.date;

    const loadTurf = async () => {
      try {
        const turfData = await fetchTurfById(Number(id));
        setTurf(turfData);
        // Fetch booked slots
        const bookedSlotsResponse = await axios.get(`http://localhost:8080/api/turf/${id}/bookings`, { params: { date: selectedDate.format('YYYY-MM-DD') } });
        setBookedSlots(bookedSlotsResponse.data);
      } catch (err) {
        setError("Failed to load turf details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadTurf();
    setTimeSlots(generateTimeSlots(6, 23, 30, currentTime, selectedDate));
  }, [formData.date, id]);

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date,
    });
    setTimeSlots(generateTimeSlots(6, 23, 30, dayjs(), date));
  };

  const handleTimeSlotClick = (time) => {
    const selectedTime = dayjs().set('hour', parseInt(time.split(':')[0])).set('minute', parseInt(time.split(':')[1]));

    if (!formData.fromTime) {
      setFormData({
        ...formData,
        fromTime: selectedTime,
        toTime: null,
      });
    } else if (!formData.toTime && selectedTime.isAfter(formData.fromTime)) {
      setFormData({
        ...formData,
        toTime: selectedTime,
      });
    } else {
      setFormData({
        ...formData,
        fromTime: selectedTime,
        toTime: null,
      });
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      paymentOption: event.target.value,
    });
  };

  const handleClose=()=>
  {
    setIsModalOpen(false);
    window.location.reload();
  }

  const generateGoogleCalendarLink = () => {
    if (!formData.fromTime || !formData.toTime) return '';
  
    const startDateTime = formData.date.format('YYYYMMDD') + 'T' + formData.fromTime.format('HHmmss');
    const endDateTime = formData.date.format('YYYYMMDD') + 'T' + formData.toTime.format('HHmmss');
    const summary = `Turf Booking at ${turf.name}`;
    const description = `Booking details:\nDate: ${formData.date.format('YYYY-MM-DD')}\nFrom: ${formData.fromTime.format('HH:mm')}\nTo: ${formData.toTime.format('HH:mm')}\nPrice: ₹${calculateTotalPrice().toFixed(2)}`;
  
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(summary)}&dates=${startDateTime}/${endDateTime}&details=${encodeURIComponent(description)}&sf=true&output=xml`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.fromTime && formData.toTime && formData.toTime.isAfter(formData.fromTime)) {
      if (isOverlapping()) {
        alert('The selected time slot overlaps with an already booked slot. Please choose a different time.');
        return;
      }

      const totalPrice = calculateTotalPrice().toFixed(2);

      const options = {
        key: "rzp_test_xtFnbnQ0oQ9B1o",
        secretkey: "6hJKdPHxGCkjBLvHGzdWjsMK",
        amount: totalPrice * 100, // Amount in paise
        currency: "INR",
        name: "Arena",
        description: "Booking Payment",
        handler: async function (response) {
          try {
            await submitBookingData(response.razorpay_payment_id);
        
            const googleCalendarLink = generateGoogleCalendarLink();
            const message = `Booking Successful: ${response.razorpay_payment_id}`;
            
            alert(message);
            setIsModalOpen(true);
          } catch (err) {
            alert('Failed to save booking. Please try again.');
          }
        },        
        prefill: {
          name: "Ashwanth",
          email: "mvel1620r@gmail.com",
          contact: "7904425033"
        },
        notes: {
          address: "Razorpay Corporate office"
        },
        theme: {
          color: "#ee1714"
        }
      };
      var pay = new window.Razorpay(options);
      pay.open();
    } else {
      alert('Please select a valid "from" and "to" time slot.');
    }
  };

  const isOverlapping = () => {
    if (!formData.fromTime || !formData.toTime) return false;

    return bookedSlots.some(slot => {
      const bookedStart = dayjs(slot.fromTime, 'HH:mm');
      const bookedEnd = dayjs(slot.toTime, 'HH:mm');
      return (
        (formData.fromTime.isBefore(bookedEnd) && formData.toTime.isAfter(bookedStart))
      );
    });
  };

  const isBooked = (time) => {
    const currentTime = dayjs().set('hour', parseInt(time.split(':')[0])).set('minute', parseInt(time.split(':')[1]));
    return bookedSlots.some(slot =>
      currentTime.isBetween(dayjs(slot.fromTime, 'HH:mm'), dayjs(slot.toTime, 'HH:mm'), null, '[]')
    );
  };

  const isDisabled = (time) => {
    const currentTime = dayjs();
    const timeSlot = dayjs(formData.date).startOf('day').set('hour', parseInt(time.split(':')[0])).set('minute', parseInt(time.split(':')[1]));
    return timeSlot.isBefore(currentTime, 'minute') || isBooked(time);
  };

  const isHighlighted = (time) => {
    if (!formData.fromTime || !formData.toTime) return false;
    const slotTime = dayjs().set('hour', parseInt(time.split(':')[0])).set('minute', parseInt(time.split(':')[1]));
    return slotTime.isBetween(formData.fromTime, formData.toTime, null, '[)');
  };

  const isToHighlighted = (time) => {
    if (!formData.toTime) return false;
    const slotTime = dayjs().set('hour', parseInt(time.split(':')[0])).set('minute', parseInt(time.split(':')[1]));
    return slotTime.isSame(formData.toTime, 'minute');
  };

  const calculateDuration = () => {
    if (formData.fromTime && formData.toTime) {
      const duration = formData.toTime.diff(formData.fromTime, 'minute');
      const hours = Math.floor(duration / 60);
      const minutes = Math.ceil((duration % 60) / 30) * 0.5; 
      return `${hours + minutes} hours`;
    }
    return '0 hours';
  };

  const calculateTotalPrice = () => {
    if (turf && formData.fromTime && formData.toTime) {
      const duration = formData.toTime.diff(formData.fromTime, 'minute') / 60;
      const totalPrice = turf.price * duration;
      return formData.paymentOption === 'advance' ? totalPrice * 0.1 : totalPrice; 
    }
    return 0;
  };

  const userId = user.userId;

  const submitBookingData = async (paymentId) => {
    const bookingData = {
      turfId: id,
      userId: userId,
      date: formData.date.format('YYYY-MM-DD'),
      fromTime: formData.fromTime.format('HH:mm'),
      toTime: formData.toTime.format('HH:mm'),
      paymentOption: formData.paymentOption,
      totalPrice: calculateTotalPrice().toFixed(2),
      paymentId: paymentId,
    };

        

    try {
      const response = await axios.post('http://localhost:8080/api/bookings', bookingData);
      if (response.status === 201) {
        alert('Booking saved successfully');
      } else {
        alert('Failed to save booking');
      }
    } catch (error) {
      console.error('Error submitting booking data:', error.response ? error.response.data : error.message);
      alert('Failed to save booking');
    }
  };

  if (loading) {
    return (
      <div className="loading-screen-container">
        <Typography variant="h6">Loading turf details...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>


      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Book Your <span style={{ color: "#ee1714" }}>Turf</span>
        </Typography>

      
    
        <Box className="bookForm">
          <form onSubmit={handleSubmit}>
            <DatePicker
              label="Select Date"
              value={formData.date}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" fullWidth margin="normal" />
              )}
            />
              <div>
                {isModalOpen && (
                 <div className="modal">
                   <div className="modal-content">
                     <h2>Booking Successful</h2>
                     <a
                       href={generateGoogleCalendarLink()}
                       target="_blank"
                       rel="noopener noreferrer"
                     >
                       Add to Google Calendar
                     </a>
                     <button onClick={handleClose}>Close</button>
                   </div>
                 </div>
               )}
              </div>
            <div>
              <Typography variant="h6">Select Time Slot:</Typography>
              <div className="time-slot-container">
                {timeSlots.map((slot, index) => (
                  <Button
                    key={index}
                    variant={isBooked(slot) ? 'contained' : 'outlined'}
                    color="primary"
                    disabled={isDisabled(slot)}
                    onClick={() => handleTimeSlotClick(slot)}
                    sx={{
                      margin: 1,
                      width: 'auto',
                      minWidth: '80px',
                      textAlign: 'center',
                      backgroundColor: isHighlighted(slot) || isToHighlighted(slot) ? '#ee1714' : '',
                      color: isHighlighted(slot) || isToHighlighted(slot) ? '#fff' : '',
                    }}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>
            <Typography variant="h6">Payment Option:</Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend">Select Payment Option</FormLabel>
              <RadioGroup
                name="paymentOption"
                value={formData.paymentOption}
                onChange={handleChange}
                row
              >
                <FormControlLabel value="advance" control={<Radio />} label="Advance (10%)" />
                <FormControlLabel value="full" control={<Radio />} label="Full Payment" />
              </RadioGroup>
            </FormControl>
            <div>
              <Typography variant="h6">Duration: {calculateDuration()}</Typography>
              <Typography variant="h6">Total Price: ₹{calculateTotalPrice().toFixed(2)}</Typography>
            </div>
            <Button type="submit" variant="contained" color="error" fullWidth>
              Proceed to Payment
            </Button>
          </form>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default BookNow;
