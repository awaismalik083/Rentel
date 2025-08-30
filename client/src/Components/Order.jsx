import React, { useEffect, useState } from "react";
import DashSidebar from "../Dashboard/DashSidebar";
import DashNavbar from "../Dashboard/DashNavbar";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTag,
  FaMapMarkerAlt,
  FaHome,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const Order = () => {
  const [propertyList, setPropertyList] = useState([]);
  const BASE_URL = "http://localhost:3000";
  const user = localStorage.getItem("sellerId");
  const SellerId = JSON.parse(user);

  useEffect(() => {
    const fetchProperties = async () => {
      if (!SellerId) {
        toast.error("Seller Id required");
        return;
      }
      try {
        const res = await axios.get(
          `http://localhost:3000/api/property/getAllProperties/${SellerId}`
        );
        setPropertyList(res.data.properties || []);
      } catch (error) {
        console.log("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [SellerId]);

  const deleteProperty = async (id) => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/api/property/deleteproperty/${id}`
      );
      if (res.data) {
        toast.success("Property Deleted Successfully");
        setPropertyList((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (error) {
      toast.error("Error deleting property");
      console.error(error);
    }
  };

  // Truncate helper
  const truncate = (text, length) =>
    text?.length > length ? text.substring(0, length) + "..." : text;

  return (
    <>
    
      <DashSidebar />

      <div className="ml-0 md:ml-[10rem] px-6 py-10 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          My Listings
        </h1>

        {propertyList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {propertyList.map((prop) => (
              <div
                key={prop._id}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl border border-gray-200 transition-all"
              >
                <Link
                  to="/dashproperty"
                  state={{ property: prop }}
                  className="block no-underline text-inherit"
                >
                  {/* Image */}
                  <div className="relative h-60">
                    <img
                      src={
                        prop.Images?.[0]
                          ? `${BASE_URL}${prop.Images[0]}`
                          : "https://via.placeholder.com/400x300?text=Property+Image"
                      }
                      alt={prop.Title}
                      className="w-full h-full object-cover"
                    />
                    {prop.Purpose && (
                      <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {prop.Purpose}
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-4">
                    <div className="text-sm text-gray-600 mb-1 flex items-center">
                      <FaHome className="mr-1 text-blue-500" />
                      {prop.Property_Type || "Type N/A"}
                    </div>

                    <h2
                      className="text-lg font-semibold text-gray-800 mb-2 truncate"
                      title={prop.Title}
                    >
                      {truncate(prop.Title, 30)}
                    </h2>

                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <FaMapMarkerAlt className="mr-1 text-red-500" />
                      {truncate(`${prop.City}, ${prop.Location}`, 30)}
                    </div>

                    <div className="text-green-600 font-bold text-md mb-3 flex items-center">
                      <FaTag className="mr-1" />
                      PKR {prop.monthlyRent || prop.price || "N/A"}
                      {prop.monthlyRent && (
                        <span className="text-xs text-gray-500 ml-1">
                          /month
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between border-t pt-3 text-sm text-gray-600">
                      <div className="flex flex-col items-center">
                        <FaBed className="text-blue-500" />
                        {prop.Bed || 0} Beds
                      </div>
                      <div className="flex flex-col items-center">
                        <FaBath className="text-blue-500" />
                        {prop.Bath || 0} Baths
                      </div>
                      <div className="flex flex-col items-center">
                        <FaRulerCombined className="text-blue-500" />
                        {prop.Area_Size} {prop.Area_Unit}
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Action Buttons */}
                <div className="flex justify-between px-4 pb-4 mt-2 gap-2">
                  <button
                    onClick={() => deleteProperty(prop._id)}
                    className="w-full bg-red-600 text-white px-3 py-2 rounded-md text-sm hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                  <Link
                    to="/UpdateProperty"
                    state={{ property: prop }}
                    className="w-full text-center bg-gray-700 text-white px-3 py-2 rounded-md text-sm hover:bg-gray-800 transition"
                  >
                    Update
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-20">No properties found</p>
        )}
      </div>
    </>
  );
};

export default Order;
