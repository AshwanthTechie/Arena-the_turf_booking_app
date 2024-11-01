import React from "react";
import Heading from "../../common/Heading";
import { team } from "../../data/Data";
import "./team.css";

const Team = () => {
  return (
    <>
      <section className='team-section background'>
        <div className='team-container'>
          <Heading
            title='Our Featured Clients'
            subtitle='Showcasing our trusted partners who trust us for their turf needs. Explore the success stories and testimonials from some of our esteemed clients.'
          />
          <div className='team-content mtop grid3'>
            {team.map((val, index) => (
              <div className='team-box' key={index}>
                <button className='team-btn3'>{val.list} Listings</button>
                <div className='team-details'>
                  <div className='team-img'>
                    <img src={val.cover} alt='' />
                    <i className='fa-solid fa-circle-check'></i>
                  </div>
                  <i className='fa fa-location-dot'></i>
                  <label>{val.address}</label>
                  <h4>{val.name}</h4>
                  <ul>
                    {val.icon.map((icon, index) => (
                      <li key={index}>{icon}</li>
                    ))}
                  </ul>
                  <div className='team-button flex'>
                    <button>
                      <i className='fa fa-envelope'></i>
                      Message
                    </button>
                    {/* <button className='team-btn4'>
                      <i className='fa fa-phone-alt'></i>
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
