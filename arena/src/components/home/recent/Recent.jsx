import React from "react"
import Heading from "../../common/Heading"
import "./recent.css"
import HomeRecentCard from "./HomeRecentCard"

const Recent = () => {
  return (
    <>
      <section className='recent padding'>
        <div className='container recent-margin'>
          <Heading title='Recent Listed Turfs' subtitle='Discover the most recently added turfs in your area. From football fields to basketball courts, find the perfect spot for your game and book with ease. Check out the newest listings and stay ahead in your sporting adventures!' />
          <br/><br/>
          <HomeRecentCard />
        </div>
      </section>
    </>
  )
}

export default Recent
