import React, { useRef } from 'react';
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaArrowsAltH,
  FaHeart,
  FaPlay,
  FaShareAlt,
} from 'react-icons/fa';
import { IoArrowForwardCircle, IoArrowBackCircle } from 'react-icons/io5';

// Card Component
const Card = ({ image, price }) => {
  return (
    <div className="relative  bg-white w-[250px] rounded-xl shadow-md flex-shrink-0 group mx-2">
      {/* Image Section */}
      <div className="relative">
        <img src={image} alt="property" className="h-44 w-full object-cover" />
        <span className="absolute bottom-2 right-2 bg-[#D7E2FF] text-blue-800 text-sm px-3 py-1 rounded-md font-semibold z-20">
          ${price}
        </span>

        {/* Hover Overlay Icons */}
        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-50 transition-opacity duration-300 z-10 flex items-center justify-center gap-3">
          <button className="bg-white p-2 rounded-full shadow hover:bg-blue-100 transition">
            <FaPlay className="text-gray-700" size={14} />
          </button>
          <button className="bg-white p-2 rounded-full shadow hover:bg-blue-100 transition">
            <FaHeart className="text-gray-700" size={14} />
          </button>
          <button className="bg-white p-2 rounded-full shadow hover:bg-blue-100 transition">
            <FaShareAlt className="text-gray-700" size={14} />
          </button>
        </div>
      </div>

      {/* Text Section */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900">Star Sun Hotel & Apartment</h3>
        <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
          <FaMapMarkerAlt className="text-blue-600" size={12} />
          Jl Letda Nasir 45 RT 001/02
        </p>
        <div className="flex justify-between items-center text-sm text-gray-700 mt-3">
          <div className="flex items-center gap-1"><FaBed size={12} /> 2</div>
          <div className="flex items-center gap-1"><FaBath size={12} /> 3</div>
          <div className="flex items-center gap-1"><FaArrowsAltH size={12} /> 24M</div>
        </div>
      </div>
    </div>
  );
};

// Carousel Component
const DashCarousal = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -270 : 270,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative mt-5 ml-[176px] max-w-[63rem] mx-auto p-4 overflow-hidden bg-gray-100 rounded-xl z-30">
      <div className="flex items-center gap-4 w-full">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="text-red-700 hover:scale-110 transition p-1 md:p-2 z-40 shrink-0"
          aria-label="Scroll left"
        >
          <IoArrowBackCircle size={36} />
        </button>

        {/* Scrollable Cards Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-2 flex-1 justify-center"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          <Card image="https://images.unsplash.com/photo-1560448076-4328b0c5f9c4" price="80" />
          <Card image="https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba" price="90" />
          <Card image="https://images.unsplash.com/photo-1502673530728-f79b4cab31b1" price="70" />
          <Card image="https://images.unsplash.com/photo-1580587771525-78b9dba3b914" price="110" />
          <Card image="https://images.unsplash.com/photo-1590490350335-6c0fef9f7f3f" price="95" />
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="text-red-700 hover:scale-110 transition p-1 md:p-2 z-40 shrink-0"
          aria-label="Scroll right"
        >
          <IoArrowForwardCircle size={36} />
        </button>
      </div>
    </div>
  );
};

export default DashCarousal;
