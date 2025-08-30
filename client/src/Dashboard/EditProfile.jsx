import React, { useState } from "react";
import DashNavbar from "./DashNavbar";
import DashSidebar from "./DashSidebar";
import { FiUpload } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { IoIosCamera } from "react-icons/io";

const EditProfile = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+92");
  const [phoneError, setPhoneError] = useState("");
  const [address, setAddress] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      toast.error("File is too large. Max size is 2MB");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sellerId = localStorage.getItem("sellerId");
    const userID = JSON.parse(sellerId);
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to change details");
      return;
    }

    // Optional: Validate phone only if user entered something
    if (phone && phone !== "+92" && !/^\+92\d{10}$/.test(phone)) {
      setPhoneError("Phone number must be in +923001234567 format");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("sellerId", userID);

      if (name.trim() !== "") formData.append("name", name);
      if (phone && phone !== "+92") formData.append("phone", phone);
      if (address.trim() !== "") formData.append("address", address);
      if (image) formData.append("image", image);

      const response = await axios.post(
        "http://localhost:3000/api/seller/updateseller",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        toast.success("Seller updated successfully");
      } else {
        toast.error("Unable to update seller");
      }
    } catch (error) {
      alert("An error occurred");
      console.error(error);
    }
  };

  return (
    <>
      <DashNavbar />
      <DashSidebar />
      <div className="bg-gray-50 min-h-screen lg:ml-[10rem] flex justify-center pt-4 pb-8 px-4 md:px-0">
        <div className="rounded-xl mt-10 bg-white w-full max-w-4xl shadow-lg p-6">
          {/* Header */}
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center text-blue-600 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            <span className="text-lg font-semibold">Edit Profile</span>
          </button>

          {/* Profile Content */}
          <div className="space-y-6">
            {/* Photo Profile Section */}
            <div>
              <h3 className="text-gray-800 text-lg font-semibold mb-1">
                Photo Profile
              </h3>
              <p className="text-gray-600 text-sm mb-3">Change photo profile</p>
              <div className="flex items-center gap-4">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                    <IoIosCamera className="text-3xl text-gray-500" />
                  </div>
                )}
                <div>
                  <label className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-blue-600 font-medium hover:bg-gray-100 transition cursor-pointer">
                    <span>Upload New Photo</span>
                    <FiUpload className="text-blue-600" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">Max 2 MB</p>
                </div>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <h3 className="text-gray-800 text-lg font-semibold mb-1">
                Full Name
              </h3>
              <p className="text-gray-600 text-sm mb-1">Your Full Name</p>
              <input
                type="text"
                placeholder="Input name user"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-sm"
              />
              <p className="text-gray-500 text-xs mt-1">Max 25 characters</p>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-gray-800 text-lg font-semibold mb-1">
                Address
              </h3>
              <p className="text-gray-600 text-sm mb-1">Your Address</p>
              <input
                type="text"
                placeholder="4517 Washington Ave. Manchester, Kentucky 39495"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-sm"
              />
            </div>

            {/* Phone */}
            <div>
              <h3 className="text-gray-800 text-lg font-semibold mb-1">
                Phone
              </h3>
              <p className="text-gray-600 text-sm mb-1">Phone Number</p>
              <input
                type="tel"
                placeholder="+923001234567"
                value={phone}
                maxLength={13}
                onChange={(e) => {
                  let value = e.target.value;

                  // Enforce +92 at start
                  if (!value.startsWith("+92")) {
                    value = "+92" + value.replace(/[^0-9]/g, "");
                  }

                  // Remove non-numeric characters after +92
                  value = "+92" + value.slice(3).replace(/[^0-9]/g, "");

                  if (value.length <= 13) {
                    setPhone(value);
                  }

                  // Validate
                  if (/^\+92\d{10}$/.test(value)) {
                    setPhoneError("");
                  } else {
                    setPhoneError(
                      "Phone number must be in +923001234567 format"
                    );
                  }
                }}
                className={`w-full p-3 border ${
                  phoneError ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring ${
                  phoneError ? "focus:ring-red-500" : "focus:ring-blue-500"
                } text-sm`}
              />
              {phoneError && (
                <p className="text-red-500 text-xs mt-1">{phoneError}</p>
              )}
            </div>

            {/* Save Button */}
            <div className="border-t border-gray-200 pt-6">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition w-full"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
