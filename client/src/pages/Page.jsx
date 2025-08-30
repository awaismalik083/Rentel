"use client";

import React, { useEffect, useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTag,
  FaMapMarkerAlt,
  FaHome,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { PropertyContext } from "../Context/PropertyContext";

export default function PropertyGrid() {
  const [properties, setProperties] = useState([]);
  const { propertyData } = useContext(PropertyContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState("recommended"); // Tabs
  const [priceSort, setPriceSort] = useState(""); // Price sorting

  // ✅ Get search query from URL
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const urlSearchQuery = urlParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);

  // ✅ Pagination settings
  const rowsPerPage = 5;
  const cardsPerRow = 4;
  const propertiesPerPage = rowsPerPage * cardsPerRow;

  // ✅ Load property data from context
  useEffect(() => {
    if (Array.isArray(propertyData)) {
      setProperties(propertyData);
    } else {
      console.error("Unexpected propertyData format:", propertyData);
    }
    setLoading(false);
  }, [propertyData]);

  // ✅ Filter properties based on search
  const filteredProperties = properties
    .filter((prop) => {
      const query = searchQuery.toLowerCase();
      const title = prop?.Title?.toLowerCase() || "";
      const city = prop?.City?.toLowerCase() || "";
      const location = prop?.Location?.toLowerCase() || "";
      const type = prop?.Property_Type?.toLowerCase() || "";
      return (
        title.includes(query) ||
        city.includes(query) ||
        location.includes(query) ||
        type.includes(query)
      );
    })
    .sort((a, b) => {
      const priceA = a.monthlyRent || a.price || 0;
      const priceB = b.monthlyRent || b.price || 0;

      if (priceSort === "high") return priceB - priceA;
      if (priceSort === "low") return priceA - priceB;
      return 0;
    });

  // ✅ Pagination logic
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const truncateText = (text, maxLength) => {
    if (!text) return "N/A";
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  const tabClass = (tab) =>
    `px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
      selected === tab
        ? "bg-gradient-to-r from-gray-600 to-gray-800 text-white shadow-md"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }`;

  return (
    <>
      <section className="bg-white  py-6">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold mb-8 text-center text-gray-800">
            Discover Latest Listed Properties
          </h2>

          {loading ? (
            <div className="text-center py-10">
              <p className="text-gray-500">Loading properties...</p>
            </div>
          ) : properties.length > 0 ? (
            <>
              {/* ✅ Filter Section with Tabs, Search, Price Sort */}
              <div className="flex flex-col mt-20 md:flex-row justify-between items-center gap-4 mb-8">
                {/* Tabs */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setSelected("recommended")}
                    className={tabClass("recommended")}
                  >
                    Recommended
                  </button>
                  <button
                    onClick={() => setSelected("latest")}
                    className={tabClass("latest")}
                  >
                    Latest
                  </button>
                </div>

                {/* Search */}
                <div className="w-full md:w-1/3">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, city , location or Property Type..."
                    className="w-full border border-gray-500 outline-none px-4 py-2 rounded-xl text-sm shadow-sm focus:ring focus:ring-blue-500"
                  />
                </div>

                {/* Price Sort */}
                <div>
                  <select
                    value={priceSort}
                    onChange={(e) => setPriceSort(e.target.value)}
                    className="border rounded-md px-3 py-2 text-sm"
                  >
                    <option value="high">High to Low</option>
                    <option value="low">Low to High</option>
                  </select>
                </div>
              </div>

              {/* ✅ Property Grid */}
              <div className="grid grid-cols-1 bg-[#fff7f3] p-5 rounded-2xl mt-16 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentProperties.map((prop, index) => (
                  <Link
                    to={`/display`}
                    state={{ property: prop }}
                    key={prop._id || index}
                    className="block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 no-underline text-inherit hover:text-inherit"
                  >
                    {/* Image */}
                    <div className="relative h-60">
                      <img
                        src={`http://localhost:3000${prop.Images?.[0]}`}
                        alt={prop.Title || "Property Image"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/400x300?text=Property+Image";
                        }}
                      />
                      {prop.Purpose && (
                        <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                          {truncateText(prop.Purpose, 15)}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <FaHome className="mr-1 text-blue-500 min-w-[16px]" />
                        <span className="font-medium text-gray-800 truncate">
                          {prop.Property_Type || "Property Type N/A"}
                        </span>
                      </div>

                      <h3
                        className="text-lg font-bold text-gray-800 mb-2 truncate"
                        title={prop.Title || "Untitled Property"}
                      >
                        {truncateText(prop.Title, 30) || "Untitled Property"}
                      </h3>

                      <div className="flex items-center text-gray-600 text-sm mb-3">
                        <FaMapMarkerAlt className="mr-1 text-red-500 min-w-[16px]" />
                        <span className="truncate">
                          {truncateText(
                            `${prop.City || ""}${
                              prop.City && prop.Location ? ", " : ""
                            }${prop.Location || ""}`,
                            25
                          ) || "Location N/A"}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-600 font-bold mb-4">
                        <FaTag className="mr-2 min-w-[16px]" />
                        <span className="text-md truncate">
                          PKR {prop.monthlyRent || prop.price || "N/A"}
                        </span>
                        {prop.monthlyRent && (
                          <span className="text-xs text-gray-500 ml-1 whitespace-nowrap">
                            /month
                          </span>
                        )}
                      </div>

                      {/* Features */}
                      <div className="flex justify-between border-t border-gray-100 pt-3">
                        <div className="flex flex-col items-center px-2">
                          <FaBed className="text-gray-500 text-md" />
                          <span className="text-xs text-gray-600 mt-1 whitespace-nowrap">
                            {prop.Bed || 0} Beds
                          </span>
                        </div>
                        <div className="flex flex-col items-center px-2">
                          <FaBath className="text-gray-500 text-md" />
                          <span className="text-xs text-gray-600 mt-1 whitespace-nowrap">
                            {prop.Bath || 0} Baths
                          </span>
                        </div>
                        <div className="flex flex-col items-center px-2">
                          <FaRulerCombined className="text-gray-500 text-md" />
                          <span className="text-xs text-gray-600 mt-1 whitespace-nowrap">
                            {prop.Area_Size || "N/A"} {prop.Area_Unit || ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* ✅ Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-10">
                  <nav className="inline-flex rounded-md shadow">
                    <button
                      onClick={() =>
                        paginate(currentPage > 1 ? currentPage - 1 : 1)
                      }
                      disabled={currentPage === 1}
                      className={`px-3 py-2 rounded-l-md border border-gray-300 ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <FaChevronLeft className="h-4 w-4" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (number) => (
                        <button
                          key={number}
                          onClick={() => paginate(number)}
                          className={`px-4 py-2 border-t border-b border-gray-300 ${
                            currentPage === number
                              ? "bg-blue-500 text-white"
                              : "bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {number}
                        </button>
                      )
                    )}

                    <button
                      onClick={() =>
                        paginate(
                          currentPage < totalPages
                            ? currentPage + 1
                            : totalPages
                        )
                      }
                      disabled={currentPage === totalPages}
                      className={`px-3 py-2 rounded-r-md border border-gray-300 ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <FaChevronRight className="h-4 w-4" />
                    </button>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No properties found</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
