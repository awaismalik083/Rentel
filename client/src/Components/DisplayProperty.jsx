"use client";

import React, { useState, useEffect, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { PropertyContext } from "../Context/PropertyContext";
import Navbar from "./Navbar";
import { asset } from "../assets/asset";
import BlogFooter from "../pages/BlogFooter";
import { useAppContext } from "../Context/Context";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTag,
  FaMapMarkerAlt,
  FaHome,
} from "react-icons/fa";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Footer from "./Footer";

const DisplayProperty = () => {
  const location = useLocation();
  const property = location.state?.property;
  const { propertyData } = useContext(PropertyContext);
  const { features } = useAppContext();

  const [showAll, setShowAll] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images =
    property?.Images?.map((img) => `http://localhost:3000${img}`) || [];

console.log(propertyData)

  useEffect(() => {
    if (propertyData?.properties && property) {
      const similar = propertyData.properties
        .filter(
          (p) =>
            p._id !== property._id &&
            p.City === property.City &&
            p.Property_Type === property.Property_Type
        )
        .slice(0, 6);
      setSimilarProperties(similar);
    }
  }, [propertyData, property]);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const visibleFeatures = showAll ? features : features.slice(0, 3);

  return (
    <>
      <Navbar />
      <section className="w-full mt-20 min-h-screen bg-white px-4 sm:px-10 py-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-8">
          {/* Left Section */}
          <div className="flex-1 w-full">
            {/* Image Carousel */}
            {images.length > 0 && (
              <div className="relative w-full max-w-4xl h-[300px] sm:h-[400px] rounded-xl overflow-hidden shadow-lg">
                <img
                  src={images[currentImageIndex]}
                  alt={`Property ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                <button
                  onClick={handlePrev}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-md transition-all"
                >
                  <FaArrowAltCircleLeft className="text-black text-xl" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-md transition-all"
                >
                  <FaArrowAltCircleRight className="text-black text-xl" />
                </button>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        currentImageIndex === index
                          ? "bg-blue-600"
                          : "bg-white bg-opacity-50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Property Details */}
            <div className="mt-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                {property?.Title}
              </h1>

              <div className="flex items-center mt-2">
                <FaMapMarkerAlt className="text-red-500 mr-1" />
                <p className="text-gray-600 text-sm sm:text-base">
                  {`${property?.Street || ""}, ${property?.Town || ""}, ${
                    property?.City || ""
                  }`}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-2xl font-bold text-green-600">
                  PKR {property?.monthlyRent}
                </p>
                <div className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-semibold">
                  {property?.Purpose}
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-10 mt-6 border-b pb-6">
                <div className="flex items-center gap-2">
                  <FaHome className="text-black" />
                  <span className="text-gray-700">
                    {property?.Property_Type}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBed className="text-black" />
                  <span className="text-gray-700">
                    {property?.Bed || 0} Beds
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBath className="text-black" />
                  <span className="text-gray-700">
                    {property?.Bath || 0} Baths
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRulerCombined className="text-black" />
                  <span className="text-gray-700">
                    {property?.Area_Size} {property?.Area_Unit}
                  </span>
                </div>
              </div>

              {/* Video */}
              {property?.Video && (
                <div className="mt-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Property Video
                  </h2>
                  <div className="w-full max-w-3xl aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <video
                      src={`http://localhost:3000${property.Video}`}
                      controls
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              {/* Description */}
              <div className="mt-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {property?.Description || "No description available."}
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-[350px] mt-8 lg:mt-0">
            {/* Contact Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 space-y-4 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800">
                PKR <span className="text-2xl">{property?.monthlyRent}</span>
              </h2>

              {showPhoneNumber ? (
                <div className="bg-green-100 border border-green-200 text-green-800 py-3 px-4 rounded-lg text-center font-semibold">
                  +{property?.Phone_Number_1 || "Not provided"}
                </div>
              ) : (
                <button
                  onClick={() => setShowPhoneNumber(true)}
                  className="bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-medium py-3 w-full rounded-lg flex justify-center items-center gap-2"
                >
                  <img src={asset.phone} alt="Phone" className="w-5 h-5" />
                  Show Phone Number
                </button>
              )}
            </div>

            {/* Inquiry Form */}
            <div className="bg-white border border-gray-200 shadow-md p-6 rounded-xl mt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Contact Agent
              </h2>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border-b border-gray-300 focus:border-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border-b border-gray-300 focus:border-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 border-b border-gray-300 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-blue-500 outline-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-md font-medium transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

           
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Similar Properties
            </h2>
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1.2 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
            >
              {similarProperties.map((prop) => (
                <SwiperSlide key={prop._id}>
                  <Link
                    to={`/display/${prop._id}`}
                    state={{ property: prop }}
                    className="block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <div className="relative h-48 w-full">
                      <img
                        src={`http://localhost:3000${prop.Images?.[0]}`}
                        alt={prop.Title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/400x300?text=Property+Image";
                        }}
                      />
                      {prop.Purpose && (
                        <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {prop.Purpose}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-3xl text-gray-800 line-clamp-1">
                        {prop.Title}
                      </h3>
                      <div className="flex items-center mt-1 text-sm text-gray-600">
                        <FaMapMarkerAlt className="mr-1 text-red-500 text-xs" />
                        <span>{prop.City}</span>
                      </div>
                      <div className="mt-3 flex items-center text-green-600 font-bold">
                        <FaTag className="mr-2 text-sm" />
                        <span>PKR {prop.monthlyRent}</span>
                      </div>
                      <div className="flex justify-between mt-4 pt-3 border-t border-gray-100 text-xs text-gray-600">
                        <div className="flex flex-col items-center">
                          <FaBed className="text-blue-500" />
                          <span>{prop.Bed || 0} Beds</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <FaBath className="text-blue-500" />
                          <span>{prop.Bath || 0} Baths</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <FaRulerCombined className="text-blue-500" />
                          <span>
                            {prop.Area_Size} {prop.Area_Unit}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default DisplayProperty;
