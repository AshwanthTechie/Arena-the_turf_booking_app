import React, { useEffect } from "react";
import Back from "../common/Back";
import RecentCard from "../home/recent/RecentCard";
import "../home/recent/recent.css";
import img from "../images/about.jpg";

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className='blog-out mb'>
        <Back name='Booking' title='Book Turfs' cover='./images/booking.jpg'  />
        <div className='container recent'> 
          <br/>
          <RecentCard />
        </div>
      </section>
    </>
  );
}

export default Blog;
