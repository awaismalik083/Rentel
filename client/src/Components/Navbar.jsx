import React, { useState } from "react";
import { Link } from "react-router-dom";
import { asset } from "../assets/asset.js";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/">
          <img className="w-32" src={asset.logo} alt="Rental Logo" />
        </Link>

        {/* Hamburger Icon (VISIBLE on small & medium screens) */}
        <div className="block md:ml-[44rem] absolute left-0  ml-[18rem] lg:hidden ">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg
              className="w-8 h-8 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Menu (VISIBLE only on lg and above) */}
        <div className="hidden lg:flex items-center gap-10 font-semibold text-gray-800">
          <Link to="/">Home</Link>
          <Link to="/Dashboard">Property</Link>
          <Link to="/page">Page</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Desktop Auth Buttons (VISIBLE only on lg and above) */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <img className="w-6" src={asset.user} alt="User Icon" />
            <Link to="/signup" className="hover:underline">Register/</Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </div>
          <Link to="/addproperty">
            <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl">
              <img className="w-4" src={asset.home} alt="Sell Icon" />
              Rent Property
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu (TOGGLE) */}
      {isOpen && (
        <div className="lg:hidden bg-white px-6 py-4">
          <ul className="flex flex-col gap-4 font-medium text-gray-800">
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/property" onClick={() => setIsOpen(false)}>Property</Link>
            <Link to="/page" onClick={() => setIsOpen(false)}>Page</Link>
            <Link to="/blog" onClick={() => setIsOpen(false)}>Blog</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>

            <div className="flex items-center bg-red-600 rounded-xl p-[10px] w-[8rem]  text-white  gap-2 ">
              <Link to="/signup" onClick={() => setIsOpen(false)}>Register/</Link>
              <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
            </div>

            <Link to="/addproperty" onClick={() => setIsOpen(false)}>
              <button className="flex items-center gap-2 p-[10px] bg-red-600 text-white  rounded-xl ">
                Rent Property
              </button>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
