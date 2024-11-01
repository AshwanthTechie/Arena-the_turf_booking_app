import React, { useEffect } from "react";
import Back from "../common/Back";
import Heading from "../common/Heading";
import img from "../images/about.jpg";
import "./about.css";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="about unique-about">
        <Back name="About Us" title="Who We Are?" cover={img} uniqueClass="unique-about-back" />
        <div className="container flex mtop unique-container">
          <div className="left row unique-left">
            <Heading title="Our Agency Story" subtitle="Check out our company story and work process" />
            <p>Welcome to Arena, where your passion for sports meets convenience and excellence. Founded with a vision to transform how you book and enjoy your favorite turf sports, Arena is your go-to platform for seamless turf reservations. We believe that every game should be unforgettable, and we’re dedicated to providing you with top-notch facilities and effortless booking experiences.</p>

            <p>At Arena, we take pride in our user-friendly interface, which allows you to book your game time in just a few clicks. Our mission is to offer a hassle-free and enjoyable experience, whether you’re organizing a casual game with friends or a competitive match.</p>
            <p>Join us in creating memorable sports moments and experience the difference with Arena. Your next great game starts here!</p>
            {/* <button className="btn2 unique-btn2">More About Us</button> */}
          </div>
          <div className="right row unique-right">
            <img src="./immio.jpg" alt="" className="unique-img" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
