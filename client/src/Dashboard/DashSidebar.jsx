import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaBuilding,
  FaEnvelope,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { asset } from "../assets/asset";

const DashSidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Profile", icon: <FaUser />, path: "/profile" },
    { name: "Properties", icon: <FaBuilding />, path: "/properties" },
    { name: "Messages", icon: <FaEnvelope />, path: "/messages" },
  ];

  // Toggle sidebar on mobile
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        className="fixed top-4 left-4 z-60 md:hidden p-2 rounded-md bg-gray-100 text-gray-700 shadow-md"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-gray-50 shadow-lg z-50
          transform transition-transform duration-300 ease-in-out
          md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-6 text-xl font-bold border-b border-gray-200">
          <img src={asset.logo} alt="" />
        </div>
        <nav className="mt-4 flex flex-col space-y-6 px-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)} // close sidebar on link click (mobile)
              className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition hover:bg-gray-100 ${
                location.pathname === item.path ? "bg-gray-100 font-semibold" : ""
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}

          <button
            className="flex items-center absolute bottom-10 gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 mt-6"
            onClick={() => {
              // Example logout handler:
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            <FaSignOutAlt />
            Logout
          </button>
        </nav>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default DashSidebar;
