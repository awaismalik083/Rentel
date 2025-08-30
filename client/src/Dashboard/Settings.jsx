import React from "react";
import DashNavbar from "./DashNavbar";
import DashSidebar from "./DashSidebar";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const handledelete = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("sellerId");
    const sellerId = JSON.parse(userId);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/seller/deleteseller",
        { sellerId }, // No body data
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        localStorage.removeItem("sellerId");
      }
      if (!response || response.status !== 200) {
        toast.error("Failed to delete User");
        return;
      }

      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <DashSidebar />
      <DashNavbar />
      <div className="bg-gray-50 flex min-h-screen items-center justify-center px-4">
        <div className="relative flex flex-col w-full max-w-[90%] md:max-w-[40rem] bg-white shadow-md rounded-xl p-6">
          {/* Top Buttons */}
          {/* Top Buttons Container */}
          <div className="flex flex-col mt-2 md:flex-row justify-between items-center w-full relative md:absolute md:top-4 md:left-4 md:right-4 px-4 gap-4 md:gap-0">
            {/* Settings Button */}
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2  px-4 py-2 bg-gray-500 text-white rounded-md text-sm md:text-base w-full md:w-auto justify-center"
            >
              <FaArrowAltCircleLeft />
              <h4>Settings</h4>
            </button>

            {/* Delete Account Button */}
            <button
              onClick={handledelete}
              className="flex  items-center gap-2 lg:mr-10 px-4 py-2 bg-red-500 text-white rounded-md text-sm md:text-base w-full md:w-auto justify-center"
            >
              <h4>Delete Account</h4>
            </button>
          </div>

          {/* Spacer to push form below buttons */}
          <div className="h-16 md:h-12" />

          {/* TimeZone Section */}
          <div className="flex flex-col mt-10 sm:flex-row justify-between items-center w-full gap-3 mb-4">
            <h3 className="font-semibold text-gray-600 w-full sm:w-auto text-sm md:text-base">
              TimeZone
            </h3>
            <select
              className="outline-none focus:outline-none w-full sm:w-[16rem] px-3 bg-gray-100 py-2 rounded-md text-sm"
              name="timezone"
              id="timezone"
            >
              <option className="outline-none " value="US">
                US
              </option>
              <option value="PKT">Pakistan (PKT)</option>
              <option value="IST">India (IST)</option>
              <option value="GMT">GMT</option>
            </select>
          </div>

          <div className="border-t border-gray-200 my-4"></div>

          {/* Activity Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-3 mb-4">
            <h3 className="font-semibold text-gray-600 w-full sm:w-auto text-sm md:text-base">
              Activity
            </h3>
            <select
              className="outline-none w-full sm:w-[16rem] px-3 bg-gray-100 py-2 rounded-md text-sm"
              name="activity"
              id="activity"
            >
              <option value="all">Activity For All</option>
              <option value="rent">Activity for Rent</option>
              <option value="sale">Activity for Sale</option>
            </select>
          </div>

          <div className="border-t border-gray-200 my-4"></div>

          {/* Location Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-3 mb-4">
            <h3 className="font-semibold text-gray-600 w-full sm:w-auto text-sm md:text-base">
              Location
            </h3>
            <select
              className="outline-none w-full sm:w-[16rem] px-3 bg-gray-100 py-2 rounded-md text-sm"
              name="location"
              id="location"
            >
              <option value="active">Active When App is Used</option>
              <option value="disable">Disable When App is Unused</option>
            </select>
          </div>
          <button className="bg-gray-300 mt-3 cursor-pointer w-[10rem] py-2 rounded-md">
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default Settings;
