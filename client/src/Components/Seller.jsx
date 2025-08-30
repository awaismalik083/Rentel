import React, { useState } from "react";
import { asset } from "../assets/asset";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { CiCamera } from "react-icons/ci";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAppContext } from "../Context/Context";

const Seller = () => {
  const { setSellerId } = useAppContext();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      alert("File is too large. Max size is 2MB");
    }
  };

  const handleCreation = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    if (phoneError || !/^\+92\d{10}$/.test(phone)) {
      toast.error("Please enter a valid phone number in +92XXXXXXXXXX format");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("image", image);

      const res = await axios.post(
        "http://localhost:3000/api/seller/createseller",
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data && res.data.success) {
        const SellerId = res.data.seller._id;

        setSellerId(SellerId);
        localStorage.setItem("sellerId", JSON.stringify(SellerId));

        toast.success("Seller Created Successfully");

        setImage(null);
        setPreview(null);
        setName("");
        setPhone("");
        setAddress("");

        navigate("/dashboard");
      } else {
        toast.error("Error Creating Seller");
      }
    } catch (error) {
      console.error(error);
      toast.error("Seller already exists or server error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="md:w-1/2 bg-gray-100 flex flex-col justify-center items-center p-8 md:p-12">
        <img
          src={asset.lg}
          alt="Modern house"
          className="rounded-2xl w-full max-w-md object-cover mb-8"
        />
        <div className="mt-10 text-center px-4 md:px-0">
          <h2 className="text-2xl font-bold text-gray-900">
            Rent your sweet home
          </h2>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Schedule visit in just a few clicks
            <br />
            visits in just a few clicks
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 flex rounded-2xl flex-col justify-center px-8 py-10 md:px-16">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-gray-600 mb-2">
            Become a Seller
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Create your seller account
          </p>

          <form className="space-y-4 w-full" onSubmit={handleCreation}>
            {/* Image Upload */}
            <div className="flex flex-col space-y-2 items-start">
              <h2 className="text-2xl text-gray-600 font-bold">Profile photo</h2>
              <div className="flex items-center gap-8 mt-4">
                <div className="z-0 w-20 h-20 rounded-full flex justify-center items-center overflow-hidden bg-gray-100">
                  {preview ? (
                    <img src={preview} alt="Preview" className="object-cover w-full h-full" />
                  ) : (
                    <CiCamera className="z-10 w-16 h-16 text-gray-400" />
                  )}
                </div>
                <label className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded cursor-pointer text-blue-600 font-medium hover:bg-gray-50">
                  Upload New Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <AiOutlineCloudUpload className="mx-2 mt-1" />
                </label>
              </div>
              <p className="text-sm text-gray-400 mt-1">Max 2 MB</p>
            </div>

            {/* Name */}
            <label htmlFor="name" className="text-md font-bold text-gray-600">Enter Your Name</label>
            <input
              type="text"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Phone */}
            <label htmlFor="phone" className="text-md font-bold text-gray-600">
              Enter Your Phone Number
            </label>
            <input
              type="tel"
              inputMode="numeric"
              placeholder="+92XXXXXXXXXX"
              value={phone}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\+?\d*$/.test(value)) {
                  setPhone(value);
                  if (/^\+92\d{10}$/.test(value)) {
                    setPhoneError("");
                  } else {
                    setPhoneError("Phone must be in +92XXXXXXXXXX format.");
                  }
                }
              }}
              maxLength={13}
              className={`w-full border mt-3 rounded-lg p-3 focus:outline-none focus:ring-2 ${
                phoneError
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              required
            />
            {phoneError && (
              <p className="text-sm text-red-500 mt-1">{phoneError}</p>
            )}

            {/* Address */}
            <label htmlFor="address" className="text-md font-bold text-gray-600">Enter Your Address</label>
            <textarea
              placeholder="Enter Your Address"
              onChange={(e) => setAddress(e.target.value)}
              className="h-[10rem] mt-3 flex outline-none rounded-md py-3 px-3 border border-gray-300 w-full"
              required
              name="address"
              id="address"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg  transition font-medium"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Seller;
