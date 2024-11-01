import React from "react";
import Header from "../common/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import Footer from "../common/footer/Footer";
import About from "../about/About";
import Blog from "../blog/Blog";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import TurfDetail from "../Detail/TurfDetail";
import Login from "../login/login";
import Register from "../register/register";
import GetListed from "../getlisted/GetListed";
import BookNow from "../booknow/BookNow";
import { MyProvider } from "../context/MyContext";
import AddTurf from "../addturf/AddTurf";
import TurfBookings from "../turfowners/TurfBookings";
import UserBookings from "../userbookings/UserBookings";
import Ground from "../grounds/Ground";
import TurfOwnerLogin from "../turfowners/TurfOwnerLogin";
import ManageTurf from "../manageturf/ManageTurf";
import LikedTurfs from "../likedturfs/LikedTurfs";


const Pages = () => {
  return (
    <MyProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/turf/:id" element={<TurfDetail />} />
        <Route path="/booking" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/getlist" element={<GetListed />} />
        <Route path="/booknow/:id" element={<BookNow />} />
        <Route path="/addturf" element={<AddTurf />} />
        <Route path="/turfbookings/:turfId" element={<TurfBookings />} />
        <Route path="/userbookings/:userId" element={<UserBookings />} />
        <Route path="/grounds" element={<Ground />} />
        <Route path="/turfownerlogin" element={<TurfOwnerLogin />} />
        <Route path="/manageturf" element={<ManageTurf />} />
        <Route path="/likedturfs/:userId" element={<LikedTurfs />} />


      </Routes>
      <Footer />
    </Router>
    </MyProvider>
  );
};

export default Pages;
