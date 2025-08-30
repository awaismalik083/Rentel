import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaWifi,
  FaSmoking,
  FaParking,
  FaHome,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { MdBalcony, MdOutlineKitchen } from "react-icons/md";
import { PiRuler } from "react-icons/pi";
import { asset } from "../assets/asset";
import DashSidebar from "./DashSidebar";
import DashNavbar from "./DashNavbar";
import axios from "axios";
import { Link } from "react-router-dom";

const DashProperty = () => {
  const location = useLocation();
  const { property } = location.state || {};
  const [seller, setSeller] = useState({});
  const [previewIndex, setPreviewIndex] = useState(null); // For modal gallery

  const user = localStorage.getItem("sellerId");
  const sellerId = JSON.parse(user);

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/seller/${sellerId}`
        );
        const sellerData = response.data.seller;
        setSeller(sellerData);
      } catch (error) {
        console.error("Error fetching seller:", error);
      }
    };

    if (sellerId) fetchSeller();
  }, [sellerId]);

  // Get property type
  const getPropertyTypeDisplay = () => {
    if (property?.Property_Type === "Home") {
      return property?.Home_Type || "APARTMENT";
    }
    return property?.Property_Type || "PROPERTY";
  };

  // Price Display
  const getPriceDisplay = () => {
    if (property?.Purpose === "Rent") {
      return `PKR ${property?.monthlyRent?.toLocaleString() || "N/A"} / month`;
    } else if (property?.Purpose === "Buy") {
      return `PKR ${property?.price?.toLocaleString() || "N/A"}`;
    }
    return "Price not available";
  };

  // Handle modal navigation
  const handlePrev = () => {
    if (previewIndex > 0) setPreviewIndex(previewIndex - 1);
  };

  const handleNext = () => {
    if (property?.Images && previewIndex < property.Images.length - 1) {
      setPreviewIndex(previewIndex + 1);
    }
  };

  return (
    <>
      <DashNavbar />

      <div className="w-[64rem] lg:ml-auto min-h-screen bg-white mt-10 px-4 sm:px-6">
        <div className="max-w-screen-xl mx-auto bg-gray-100 rounded-xl shadow-md font-sans p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Section */}
            <div className="bg-white w-full pt-6 rounded-xl px-4 sm:px-6">
              <div className="w-full space-y-6">
                {/* Main Media */}
                <div className="relative w-full overflow-hidden rounded-xl">
                  {property?.Video ? (
                    <video
                      autoPlay
                      controls
                      className="w-full rounded-xl object-cover h-[200px] sm:h-[300px] lg:h-[400px]"
                    >
                      <source
                        src={`http://localhost:3000${property.Video}`}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  ) : property?.Images?.[0] ? (
                    <img
                      src={`http://localhost:3000${property.Images[0]}`}
                      alt={property.Title}
                      className="w-full rounded-xl object-cover h-[200px] sm:h-[300px] lg:h-[400px]"
                    />
                  ) : (
                    <div className="w-full rounded-xl bg-gray-200 flex items-center justify-center h-[200px] sm:h-[300px] lg:h-[400px]">
                      <span className="text-gray-500">No media available</span>
                    </div>
                  )}
                </div>

                {/* Thumbnails */}
                {property?.Images && property.Images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {property.Images.slice(0, 4).map((imgSrc, idx) => (
                      <img
                        key={idx}
                        src={`http://localhost:3000${imgSrc}`}
                        alt={`${property.Title} ${idx + 1}`}
                        className="rounded-xl h-24 w-full object-cover cursor-pointer hover:opacity-80"
                        onClick={() => setPreviewIndex(idx)}
                      />
                    ))}
                  </div>
                )}

                {/* Info */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-600">
                    {getPropertyTypeDisplay().toUpperCase()}
                  </h3>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {property?.Title || "Property Title Not Available"}
                  </h1>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <FaMapMarkerAlt className="mr-1" />{" "}
                    {property?.Location
                      ? `${property.Location}, ${property.Town}, ${property.City}`
                      : "Location not available"}
                  </p>
                  <p className="text-green-600 font-bold text-lg mt-2">
                    {getPriceDisplay()}
                  </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaBed /> {property?.Bed || 0} Beds
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBath /> {property?.Bath || 0} Baths
                  </div>
                  <div className="flex items-center gap-2">
                    <PiRuler /> {property?.Area_Size || "N/A"}{" "}
                    {property?.Area_Unit || ""}
                  </div>
                  {property?.Additional_Features?.includes("Kitchen") && (
                    <div className="flex items-center gap-2">
                      <MdOutlineKitchen /> Kitchen
                    </div>
                  )}
                  {property?.Additional_Features?.includes("Balcony") && (
                    <div className="flex items-center gap-2">
                      <MdBalcony /> Balcony
                    </div>
                  )}
                  {property?.Additional_Features?.includes("WiFi") && (
                    <div className="flex items-center gap-2">
                      <FaWifi /> Wifi
                    </div>
                  )}
                  {property?.Additional_Features?.includes("Smoking") && (
                    <div className="flex items-center gap-2">
                      <FaSmoking /> Smoking Area
                    </div>
                  )}
                  {property?.Additional_Features?.includes("Parking") && (
                    <div className="flex items-center gap-2">
                      <FaParking /> Parking Area
                    </div>
                  )}
                  {property?.Installment && (
                    <div className="flex items-center gap-2">
                      <FaHome /> Installment Available
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="mt-4 text-gray-600 mb-6 text-sm leading-relaxed sm:leading-tight">
                  <p>
                    {property?.Description || "No description available."}
                    {property?.Description &&
                      property.Description.length > 200 && (
                        <span className="text-blue-500 ml-1 cursor-pointer">
                          Learn More
                        </span>
                      )}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-1/2 space-y-6">
              <Link to="/profile">
                {/* Seller Info */}
                <div className="rounded-2xl bg-white p-6 shadow-md flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        seller?.image
                          ? `http://localhost:3000${seller.image}`
                          : "https://via.placeholder.com/80"
                      }
                      alt="agent"
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {seller?.name || "Unknown"}
                      </h2>
                      <p className="text-sm text-gray-500">Property Seller</p>
                    </div>
                  </div>

                  <div className="space-y-3 mt-4">
                    <div className="flex items-start gap-2 text-gray-600">
                      <FaMapMarkerAlt className="text-gray-400 mt-1" />
                      <p className="ml-3">
                        {seller?.address || "No address available"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="text-lg">📞</span>
                      <p>{seller?.phone || "No phone available"}</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="text-lg">✉️</span>
                      <p>{seller?.email || "No email available"}</p>
                    </div>
                    <p className="text-xs text-gray-400">
                      Joined:{" "}
                      {seller?.date
                        ? new Date(seller.date).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </Link>

              {/* Map */}
              <div className="rounded-2xl bg-white overflow-hidden shadow-md">
                <img
                  src={asset.maps}
                  alt="map"
                  className="w-full h-48 object-cover"
                />
              </div>

              {/* Book Button */}
              <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:bg-blue-700 transition">
                {property?.Purpose === "Rent" ? "Rent Now" : "Buy Now"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <DashSidebar />

      {/* ✅ Image Preview Modal */}
      {previewIndex !== null && property?.Images && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-10 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-lg p-4 max-w-[80%] max-h-[80%]">
            <button
              className="absolute top-0 right-1 text-white bg-black rounded-full  text-xl"
              onClick={() => setPreviewIndex(null)}
            >
              <FaTimes />
            </button>
            <img
              src={`http://localhost:3000${property.Images[previewIndex]}`}
              alt="Preview"
              className="max-w-full max-h-[70vh] object-contain"
            />
            {/* Navigation */}
            {previewIndex > 0 && (
              <button
                className="absolute top-1/2 left-2 text-white bg-black bg-opacity-50 p-2 rounded-full"
                onClick={handlePrev}
              >
                <FaChevronLeft />
              </button>
            )}
            {previewIndex < property.Images.length - 1 && (
              <button
                className="absolute top-1/2 right-2 text-white bg-black/10 bg-opacity-50 p-2 rounded-full"
                onClick={handleNext}
              >
                <FaChevronRight />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DashProperty;
