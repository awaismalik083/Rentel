import React from "react";

import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-[#fff7f3] min-h-screen mt-15 flex items-center justify-center px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Content */}
        <div className="md:w-1/2 text-left">
          <h1 className="text-7xl montesserat font-extrabold text-gray-900 leading-tight">
            Find Your <br />
            Dream Home
          </h1>
          <p className="text-gray-600 mt-6 text-md leading-relaxed">
            Explore our curated selection of exquisite properties meticulously tailored 
            to your unique dream home vision
          </p>
          <div className="mt-10">

          <Link to="/signup" className=" bg-black text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-800 transition">
            Sign up
          </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 mt-10 md:mt-0">
          <img
            src="hero.png"
            alt="Modern House"
            className="rounded-lg" 
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
