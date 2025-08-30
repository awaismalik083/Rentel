"use client";

import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const navLinks = [
    {
      name: "Home",
      to: "/",
    },
    {
      name: "Property",
      to: "/property",
    },
    {
      name: "Contact",
      to: "/contact",
    },
  ];

  return (
    <footer className="py-10 px-4 bg-[#fff7f3] sm:px-6 lg:px-8 font-inter relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
        <div className="mb-6 flex items-center justify-center">
          <img src="Rentels.png" className="w-32" alt="Footer Logo" />
        </div>

        <nav className="mb-2 w-full">
          <ul className="flex flex-wrap justify-center gap-x-10 gap-y-1 text-base font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.to}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-gray-900 dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-4">
          &copy; {new Date().getFullYear()} Rentels. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
