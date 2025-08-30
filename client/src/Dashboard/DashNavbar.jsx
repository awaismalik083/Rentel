import React, { useState, useRef, useEffect } from "react";
import { IoNotifications } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { asset } from "../assets/asset";
import { useAppContext } from "../Context/Context";

const DashNavbar = () => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const navigate = useNavigate();
  const [seller, setSeller] = useState(null);

  const { sellerId } = useAppContext();

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/seller/${sellerId}`
        );
        if (response.data && response.data.seller) {
          setSeller(response.data.seller);
        }
      } catch (error) {
        console.error("Error fetching seller:", error);
        setSeller(null);
      }
    };

    if (sellerId) fetchSeller();
  }, [sellerId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
   <header className="z-40 w-full bg-gray-100 shadow-sm">
  <nav className="flex items-center justify-between px-4 sm:px-6 md:px-8 h-16 md:h-20">
    {/* Optional Left Content: Add logo/search bar here if needed */}

    {/* Right Section */}
    {seller && (
      <div className="ml-auto flex items-center gap-6 text-gray-600 relative">
        {/* Post Property Button */}
        <button
          onClick={() => navigate("/addproperty")}
          className="py-2 px-4 bg-black text-white text-sm rounded transition hover:bg-gray-800"
        >
          Post Property
        </button>

        {/* Notification Icon */}
        {/* <div ref={notifRef} className="relative">
          <IoNotifications
            className="text-xl cursor-pointer hover:text-gray-800 transition"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
          />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            1
          </span>

         
          {isNotifOpen && (
            <div className="absolute right-0 mt-3 w-96 bg-white rounded-md shadow-lg overflow-hidden z-50">
              <div className="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-100 border-b">
                Seen
              </div>

              <div className="flex items-start gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer">
                <img
                  src={asset.sg}
                  alt="thumb"
                  className="w-12 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-800">
                    You have a good eye
                  </p>
                  <span className="text-xs text-gray-500">4h</span>
                </div>
                <div className="text-gray-400 text-lg leading-none">
                  ...
                </div>
              </div>
            </div>
          )}
        </div> */}

        {/* Profile Image or Icon */}
        {seller.image ? (
          <img
            src={`http://localhost:3000${seller.image}`}
            alt="Profile"
            onClick={() => navigate("/profile")}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover cursor-pointer border hover:scale-105 transition"
          />
        ) : (
          <FaCircleUser
            onClick={() => navigate("/profile")}
            className="text-2xl md:text-3xl cursor-pointer hover:text-gray-800 transition"
          />
        )}
      </div>
    )}
  </nav>
</header>

  );
};

export default DashNavbar;
