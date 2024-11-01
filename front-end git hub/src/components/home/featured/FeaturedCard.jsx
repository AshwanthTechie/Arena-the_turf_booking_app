import React from "react";
import { featured } from "../../data/Data";
import "./Featured.css"; // Import the CSS file to apply styles

const FeaturedCard = () => {
  return (
    <>
      <div className='content grid5 mtop responsive-featured'>
        {featured.map((items, index) => (
          <div className='box' key={index}>
            <img src={items.cover} alt='' />
            <h4>{items.name}</h4>
            <label>{items.total}</label>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeaturedCard;
