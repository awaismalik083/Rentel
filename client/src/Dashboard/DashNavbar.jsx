import React from 'react';
import { IoNotifications } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";

const DashNavbar = () => {
  return (
    <header className="z-10 w-full bg-gray-100 shadow-sm">
      <nav className="flex items-center justify-between px-4 sm:px-8 h-[5rem]">

        {/* Search Box */}
        <div className="flex items-center mx-[20rem]  w-full max-w-md bg-[#E6E6E6] rounded-md h-10 px-3">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search here"
            className="ml-2 bg-transparent focus:outline-none w-full text-sm text-gray-700 placeholder:text-gray-500"
          />
        </div>

        {/* Notification + Profile */}
        <div className="flex items-center gap-6 text-gray-600 ml-4">
          <IoNotifications className="text-xl cursor-pointer" />
          <FaCircleUser className="text-3xl cursor-pointer" />
        </div>
      </nav>
    </header>
  );
};

export default DashNavbar;
