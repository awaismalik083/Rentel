import React, { useState } from 'react';
import { IoNotifications, IoMenu, IoClose } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";

const DashNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="z-40 w-full bg-gray-100 shadow-sm">
      <nav className="flex items-center justify-between px-4 sm:px-6 md:px-8 h-16 md:h-20">
        {/* Mobile Menu Button - Hidden on desktop */}
        <button 
          className="md:hidden text-gray-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
        </button>

        {/* Search Box - Responsive sizing */}
        <div className="flex items-center mx-4 md:mx-8 lg:mx-12 xl:mx-[20rem] w-full max-w-2xl bg-[#E6E6E6] rounded-md h-10 px-3">
          <FaSearch className="text-gray-500 text-sm md:text-base" />
          <input
            type="text"
            placeholder="Search here"
            className="ml-2 bg-transparent focus:outline-none w-full text-xs sm:text-sm text-gray-700 placeholder:text-gray-500"
          />
        </div>

        {/* Notification + Profile - Hidden on mobile when menu is open */}
        <div className={`flex items-center gap-4 md:gap-6 text-gray-600 ${isMobileMenuOpen ? 'hidden md:flex' : 'flex'}`}>
          <div className="relative">
            <IoNotifications className="text-lg md:text-xl cursor-pointer hover:text-gray-800 transition" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </div>
          <FaCircleUser className="text-2xl md:text-3xl cursor-pointer hover:text-gray-800 transition" />
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30 mt-16" 
               onClick={() => setIsMobileMenuOpen(false)}>
            <div className="bg-white shadow-lg p-4 absolute right-4 top-2 rounded-md w-48">
              <div className="flex flex-col gap-4">
                <a href="#" className="text-gray-700 hover:text-blue-600">Dashboard</a>
                <a href="#" className="text-gray-700 hover:text-blue-600">Profile</a>
                <a href="#" className="text-gray-700 hover:text-blue-600">Settings</a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default DashNavbar;