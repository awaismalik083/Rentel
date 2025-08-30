import React, { useContext, useEffect, useState } from "react";
import { FaMapMarkerAlt, FaBed, FaBath } from "react-icons/fa";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import DashSidebar from "./DashSidebar";
import DashNavbar from "./DashNavbar";
import DashCarousal from "./DashCarousal";
import { PropertyContext } from "../Context/PropertyContext";
import { Link } from "react-router-dom";

const DashDisplay = () => {
  const { propertyData } = useContext(PropertyContext);
  const [selected, setSelected] = useState("recommended");
  const [priceSort, setPriceSort] = useState("");
  const [property, setProperty] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (propertyData && propertyData.length > 0) {
      applyFilter(selected);
    }
  }, [propertyData, selected, priceSort, searchQuery]);

  const applyFilter = (filter) => {
    let filtered = [...propertyData];

    // Apply tab filter
    if (filter === "recommended") {
      filtered = filtered.sort(() => 0.5 - Math.random());
    } else if (filter === "latest") {
      filtered = filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    // Apply price sort filter
    if (priceSort === "high") {
      filtered = filtered.sort(
        (a, b) => (b.monthlyRent || 0) - (a.monthlyRent || 0)
      );
    } else if (priceSort === "low") {
      filtered = filtered.sort(
        (a, b) => (a.monthlyRent || 0) - (b.monthlyRent || 0)
      );
    }

    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.Title?.toLowerCase().includes(query) ||
          item.City?.toLowerCase().includes(query) ||
          item.Street?.toLowerCase().includes(query) ||
          item.Property_Type?.toLowerCase().includes(query)
      );
    }

    setProperty(filtered.slice(0, 8)); // Show only first 8
  };

  const tabClass = (tab) =>
    `px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
      selected === tab
        ? "bg-gradient-to-r from-gray-600 to-gray-800 text-white shadow-md"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }`;

  return (
    <div className="relative w-full bg-gray-50">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <DashSidebar />
      </div>

      {/* Navbar */}
      <div className="z-40">
        <DashNavbar />
      </div>

      {/* Main Content */}
      <div className="pt-16 sm:pt-17 md:pt-24 lg:pt-[50px] px-4">
        <DashCarousal />

        <div className="bg-gray-100 sm:w-screen sm-absolute sm:left-0 min-w-[64rem] rounded-xl shadow-md lg:ml-[175px] max-w-[66rem] min-h-[20rem] mb-10 p-6 lg:mt-6">
          {/* Tabs & Filter Section */}
          <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-8">
            {/* Tabs and Search */}
            <div className="flex flex-wrap gap-3 items-center">
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
              <div className="flex ml-40"> 
                <input
                  type="text"
                  placeholder="Search by title, city, or street..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border px-3 py-2  rounded-md text-sm w-full sm:w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            {/* Price Sort Dropdown */}
            <div>
              <select
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm"
              >
                <option value="">Sort by Price</option>
                <option value="high">High to Low</option>
                <option value="low">Low to High</option>
              </select>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {property.map((item) => (
              <Link
                to="/dashproperty"
                state={{ property: item }}
                key={item._id}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition w-full">
                  {/* Image */}
                  <div className="relative w-full h-44">
                    <img
                      src={
                        item.Images && item.Images.length > 0
                          ? `http://localhost:3000${item.Images[0]}`
                          : "/placeholder.jpg"
                      }
                      alt={item.Title}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-blue-100 text-blue-700 font-semibold text-sm px-3 py-1 rounded-lg">
                      PKR {item.monthlyRent?.toLocaleString()}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="p-3">
                    <h3 className="font-semibold text-sm text-gray-800 mb-1 truncate">
                      {item.Title}
                    </h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                      <FaMapMarkerAlt className="text-blue-500" /> {item.City},{" "}
                      {item.Street}
                    </p>
                    <div className="flex text-gray-600 text-xs gap-4 mb-2 flex-wrap">
                      <span className="flex items-center gap-1">
                        <FaBed /> {item.Bed}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaBath /> {item.Bath}
                      </span>
                      <span className="flex items-center gap-1">
                        <MdPhotoSizeSelectActual /> {item.Images?.length || 0}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashDisplay;
