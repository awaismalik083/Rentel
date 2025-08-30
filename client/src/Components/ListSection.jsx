"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAppContext } from "../Context/Context.jsx";
import Testimonials from "./testimonials.jsx";
import axios from "axios";
import { IoArrowForwardCircle, IoArrowBackCircle } from "react-icons/io5";
import {
  FaMapMarkerAlt,
  FaHome,
  FaTag,
  FaBed,
  FaBath,
  FaArrowsAltH,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const ListSection = () => {
  const scrollRef = useRef(null);
  const { list_places } = useAppContext();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const getProperty = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/property/getAllPropertiesWithoutSeller`
        );
        let property = response.data?.properties || response.data;
        property = property.sort(() => Math.random() - 0.5).slice(0, 3);
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
  console.log("this is properties state", properties);

  return (
    <div className="mt-[296px] sm:mt-[296px] md:mt-[296px] lg:mt-0">
      <div className="py-8 md:py-16 px-4 sm:px-6 lg:px-0 text-center max-w-7xl mx-auto">
        {/* Top Section */}
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Explore our listings
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-2 md:mt-3 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel
            lobortis justo
          </p>

          <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-20">
            {list_places.map((place, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-24 sm:w-28"
              >
                <img
                  src={place.Image}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 object-cover rounded-full border-2 border-gray-200 shadow"
                  alt={place.name}
                />
                <h3 className="mb-3  text-gray-800  truncate ">
                  {truncateText(place.name) || "Untitled Property"}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {place.listings}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Property Cards Section */}
        <div className="mb-12 mt-15 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-800">
            Discover The Latest Real Estate
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-2 md:mt-3 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel
            lobortis justo
          </p>

          {/* Property Cards */}
          {properties.length > 0 && (
            <div className="relative hidden lg:block mt-5 min-w-full mx-auto p-4 overflow-hidden bg-[#fff7f3] rounded-xl z-30">
              <div className="flex items-center gap-4 w-full ">
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
        </div>

        {/* Bottom Section */}
        <Testimonials />
        {/* <div className="mt-8 md:mt-16 flex flex-col lg:flex-row rounded-lg overflow-hidden shadow-lg">
          <div className="lg:w-1/2">
            <img
              src={asset.bg1}
              alt="Modern house with pool"
              className="w-full h-64 sm:h-80 md:h-[400px] object-cover"
            />
          </div>
          <div className="lg:w-1/2 bg-[#fff7f3] p-6 sm:p-8 flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              Explore Your Dream Home or Boost Your Investment Portfolio Today -
              Your Future Awaits!
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2 md:mt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed
              tristique metus proin id lorem odio
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4">
              <div className="bg-white rounded-lg shadow p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-200 rounded-full"></div>
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-gray-800">
                    Darlene Robertson
                  </h4>
                  <button className="text-red-500 text-xs sm:text-sm font-semibold hover:underline">
                    Contact Seller
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-200 rounded-full"></div>
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-gray-800">
                    Darlene Robertson
                  </h4>
                  <button className="text-red-500 text-xs sm:text-sm font-semibold hover:underline">
                    Contact Seller
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> */}
       
      </div>
    </div>
  );
};

export default ListSection;
