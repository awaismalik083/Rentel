import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoBagHandleSharp } from "react-icons/io5";

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
    { name: "My Orders", icon: <IoBagHandleSharp /> ,path: "/order" },
    { name: "Properties", icon: <FaBuilding />, path: "/dashproperty" },
    { name: "Messages", icon: <FaEnvelope />,path:"/messages" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger Menu (Mobile) */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-white rounded-md shadow-md border border-gray-200"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-40 bg-gray-50 shadow-xl z-40
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          flex flex-col
        `}
      >
        {/* Logo */}
        <div className="p-5 border-b border-gray-200">
          <img src={asset.logo} alt="Logo" className="h-6" />
        </div>

        {/* Navigation */}
        <div className="flex-1 flex flex-col justify-between">
          <nav className="py-4 px-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 p-3 rounded-lg text-gray-700 text-sm
                  hover:bg-gray-100 transition
                  ${location.pathname === item.path ? "bg-gray-100 font-medium" : ""}
                `}
              >
                <span className="text-gray-500">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-3 border-t border-gray-200">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100 text-sm"
            >
              <FaSignOutAlt className="text-gray-500" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default DashSidebar;