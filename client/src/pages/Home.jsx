import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import ListSection from '../Components/ListSection'
import PropertySale from '../Components/PropertySale'
import Footer from '../Components/Footer'
const Home = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <ListSection/>
    <PropertySale/>
    <Footer/>
    </>
  )
}

export default Home