import React from "react";
import Heading from "../../common/Heading";
import { location } from "../../data/Data";
import "./style.css";

const Location = () => {
  return (
    <section className='location-section'>
      <div className='location-container'>
        <Heading
          title='Explore By Location'
          subtitle='Discover the perfect playfield near you with our Explore by Location feature. Browse available turfs in your city to find the ideal spot for your next game or event.'
          className='location-title'
        />

        <div className='location-grid'>
          {location.map((item, index) => (
            <div className='location-box' key={index}>
              <img src={item.cover} alt={item.name} />
              <div className='location-overlay'>
                <div className='location-overlay-content'>
                  <h5>{item.name}</h5>
                  <p>
                    <label>{item.Villas}</label>
                    <label>{item.Offices}</label>
                    <label>{item.Apartments}</label>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Location;
