import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  // Navigate to property page with search query
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchInput.trim() !== "") {
      navigate(`/property?search=${encodeURIComponent(searchInput.trim())}`);
      setSearchInput("");
    }
  };

  return (
    <div className="bg-[#fff7f3] shadow-md fixed top-0 w-full z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/">
          <img className="w-32" src="/Rentels.png" alt="Rental Logo" />
        </Link>

        {/* Search Bar (Desktop Only) */}
        <div className="hidden lg:block flex-1 px-8">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search properties..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center justify-center gap-20 flex-1">
          <Link to="/" className="font-semibold text-gray-800">Home</Link>
          <Link to="/property" className="font-semibold text-gray-800">Property</Link>
          <Link to="/contact" className="font-semibold text-gray-800">Contact</Link>
          <Link to="/login" className="bg-black text-white px-6 py-2 rounded-xl">Login</Link>
        </div>

        {/* Hamburger (Mobile) */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white px-6 py-4">
          <ul className="flex flex-col gap-4 font-medium text-gray-800">
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/property" onClick={() => setIsOpen(false)}>Property</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <div className="bg-red-600 text-white text-center py-2 rounded-xl">Login</div>
            </Link>
            <Link to="/addproperty" onClick={() => setIsOpen(false)}>
              <button className="flex items-center gap-2 p-[10px] bg-red-600 text-white rounded-xl">
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
