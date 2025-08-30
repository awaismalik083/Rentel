"use client";

import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("Sending...");

    try {
      const response = await fetch("http://localhost:3000/api/contact/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: "",
        });
      } else {
        setStatus("Failed to send. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setStatus("Error sending message.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      {/* Left Panel */}
      <div className="bg-black text-white w-full md:w-1/2 px-8 py-30 flex flex-col justify-between">
        <div className="flex flex-col space-y-30 relative">
          <h2 className="text-3xl font-bold mb-2">Contact Information</h2>
          <p className="text-gray-300 mb-8">
            Say something to start a live chat!
          </p>

          <div className="flex items-center gap-4 mb-6">
            <FaPhone className="text-lg" />
            <span>+923286600864</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <FaEnvelope className="text-lg" />
            <span>muhammadawaiss1213@gmail.com</span>
          </div>

          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-lg" />
            <span>
              Street no 1, Riyaz Colony,
              <br />
              University Chowk, Bahawalpur
            </span>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="bg-white w-full md:w-1/2 px-8 py-12">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                required
                className="w-full border-b border-gray-400 focus:outline-none py-2"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                required
                className="w-full border-b border-gray-400 focus:outline-none py-2"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full border-b border-gray-400 focus:outline-none py-2"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 012 3456 789"
                required
                className="w-full border-b border-gray-400 focus:outline-none py-2"
              />
            </div>
          </div>

          {/* Subject Selection */}
          <div>
            <label className="block text-sm text-gray-700 font-medium mb-2">
              Select Subject?
            </label>
            <div className="flex flex-wrap gap-4">
              {[
                "General Inquiry",
                "Support",
                "Partnership",
                "Feedback",
                "Other",
              ].map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 text-sm"
                >
                  <input
                    type="radio"
                    name="subject"
                    value={option}
                    checked={formData.subject === option}
                    onChange={handleChange}
                    className="accent-black"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1">
              Message
            </label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message.."
              required
              className="w-full border-b border-gray-400 focus:outline-none py-2 resize-none"
            ></textarea>
          </div>

          {/* Send Button */}
          <div>
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-all"
            >
              Send Message
            </button>
            {status && <p className="text-sm mt-2 text-gray-600">{status}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
