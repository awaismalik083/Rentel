"use client";

import React from "react";
import { useAppContext } from "../Context/Context";
import { asset } from "../assets/asset";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { IoArrowForwardCircle, IoArrowBackCircle } from "react-icons/io5";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaArrowsAltH,
  FaHome,
  FaTag,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const PropertySale = () => {
  const { Logos, Sellers } = useAppContext();
  const [properties, setProperties] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const getProperty = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/property/getAllPropertiesWithoutSeller`
        );
        const property = response.data?.properties || response.data;
        setProperties(property);
      } catch (error) {
        console.log("Error occurred", error);
      }
    };
    getProperty();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -340 : 340,
        behavior: "smooth",
      });
    }
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "N/A";
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-8 md:py-12 w-full overflow-x-hidden">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
          Properties For Sale
        </h1>
        <p className="mt-2 md:mt-3 font-semibold text-gray-400 tracking-wide text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi cumque
          et rerum illo ipsum
        </p>
      </div>

      {properties.length > 0 && (
        <div className="relative hidden lg:block mt-5 min-w-full mx-auto p-4 overflow-x-hidden bg-[#fff7f3] rounded-xl z-30">
          <div className="flex items-center gap-4 overflow-x-hidden w-full ">
            <button
              onClick={() => scroll("left")}
              className="text-black hover:scale-110 transition p-1 md:p-2 z-40 shrink-0"
            >
              <IoArrowBackCircle size={36} />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-2 flex-1"
            >
              {properties.map((prop) => (
                <Link
                  to={`/display`}
                  state={{ property: prop }}
                  key={prop._id}
                  className="group bg-white w-[340px]  rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 flex-shrink-0 border border-gray-200"
                >
                  {/* Image Section */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={`http://localhost:3000${prop.Images?.[0]}`}
                      alt={prop.Title || "Property Image"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x300?text=Property+Image";
                      }}
                    />
                    {prop.Purpose && (
                      <span className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-semibold px-3 py-1 rounded-full shadow-sm">
                        {truncateText(prop.Purpose, 15)}
                      </span>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-4 space-y-5">
                    <div className="flex items-center text-sm text-gray-500">
                      <FaHome className="text-blue-500 mr-2" />
                      <span className="font-medium text-gray-700 truncate">
                        {prop.Property_Type || "Property Type N/A"}
                      </span>
                    </div>

                    <h3 className="mb-3 font-bold text-2xl text-gray-800 leading-tight truncate text-left">
                      {truncateText(prop.Title, 30) || "Untitled Property"}
                    </h3>

                    <div className="flex items-center text-sm text-gray-500">
                      <FaMapMarkerAlt className="text-red-500 mr-2" />
                      <span className="truncate">
                        {truncateText(
                          `${prop.City || ""}${
                            prop.City && prop.Location ? ", " : ""
                          }${prop.Location || ""}`,
                          30
                        ) || "Location N/A"}
                      </span>
                    </div>

                    <div className="flex items-center text-green-600 font-semibold">
                      <FaTag className="mr-2" />
                      <span className="truncate">
                        PKR {prop.monthlyRent || prop.price || "N/A"}
                      </span>
                      {prop.monthlyRent && (
                        <span className="text-xs text-gray-500 ml-1">
                          /month
                        </span>
                      )}
                    </div>

                    {/* Features */}
                    <div className="flex justify-between border-t border-gray-100 pt-3 mt-3 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <FaBed className="text-blue-500" />
                        {prop.Bed || 0} Beds
                      </div>
                      <div className="flex items-center gap-1">
                        <FaBath className="text-blue-500" />
                        {prop.Bath || 0} Baths
                      </div>
                      <div className="flex items-center gap-1">
                        <FaArrowsAltH className="text-blue-500" />
                        {prop.Area_Size || "N/A"} {prop.Area_Unit || ""}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <button
              onClick={() => scroll("right")}
              className="text-black hover:scale-110 transition p-1 md:p-2 z-40 shrink-0"
            >
              <IoArrowForwardCircle size={36} />
            </button>
          </div>
        </div>
      )}

      {/* Trusted Companies */}
      <div className="mt-12 sm:mt-16 md:mt-20">
        <h1 className="text-center text-gray-900 font-bold text-base sm:text-lg md:text-xl">
          Trusted by over 150+ major companies
        </h1>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 mt-4 sm:mt-6 px-4">
          {Logos.map((item, index) => (
            <div key={index} className="flex items-center h-8 sm:h-10 md:h-12">
              <img
                src={item.Image}
                alt={`Company logo ${index}`}
                className="h-full object-contain max-w-[100px] sm:max-w-[120px]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Meet The Agents */}
      <div className="mt-12 sm:mt-16 md:mt-20 text-center w-full">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
          Meet The Agents
        </h1>
        <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base max-w-lg mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quis
        </p>

        <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-10 max-w-7xl mx-auto">
          {Sellers.map((item, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg overflow-hidden shadow-md"
            >
              <img
                className="w-full h-56 sm:h-60 md:h-64 object-cover"
                src={item.Image}
                alt={item.name}
              />
              <div className="p-4">
                <p className="font-semibold text-base sm:text-lg text-gray-800">
                  {item.name}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  {item.description}
                </p>
                <div className="flex justify-end gap-2 mt-2 sm:mt-3">
                  <button className="bg-gray-100 hover:bg-gray-200 rounded-full p-1 sm:p-2 transition">
                    <img
                      className="w-3 h-3 sm:w-4 sm:h-4"
                      src={asset.mail}
                      alt="mail"
                    />
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 rounded-full p-1 sm:p-2 transition">
                    <img
                      className="w-3 h-3 sm:w-4 sm:h-4"
                      src={asset.phone}
                      alt="phone"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <section className="bg-white py-16 px-4 sm:px-8 md:px-12 lg:px-24">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
            {/* 🧾 Right Side: Text Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#3b200f] leading-snug mb-4">
                We Help You To Find <br className="hidden sm:inline" />
                Your Dream Home
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
                From cozy cottages to luxurious estates, our dedicated team
                guides you through every step of the journey, ensuring your
                dream home becomes a reality.
              </p>

              {/* 📊 Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-8">
                <div className="text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#3b200f]">
                    8K+
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Houses Available</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#3b200f]">
                    6K+
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Houses Sold</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#3b200f]">
                    2K+
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Trusted Agents</p>
                </div>
              </div>
            </div>

            {/* 🏡 Left Side: Image */}
            <div className="w-full lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Modern House"
                className="rounded-xl shadow-xl w-full object-cover max-h-[450px] mx-auto"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PropertySale;
