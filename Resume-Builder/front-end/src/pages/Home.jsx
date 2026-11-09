import React from 'react'
import Banner from '../components/home/Banner'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Footer from '../components/home/Footer'
import Newsletter from '../components/home/Newsletter'

const Home = () => {
  return (
    <div>
      <Banner/>
      <Hero/>
      <Features/>
      <Newsletter/>
      <Footer/>
    </div>
  )
}

export default Home
