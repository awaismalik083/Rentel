import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Navbar from "./Navbar";
import { asset } from "../assets/asset";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/user/login", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        alert("Login successful!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-[4rem] flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="md:w-1/2 bg-gray-100 flex flex-col justify-center items-center p-8 md:p-12">
          <img
            src={asset.lg}
            alt="Modern house"
            className="rounded-2xl w-full max-w-md object-cover mb-8"
          />
          <div className="mt-10 text-center px-4 md:px-0">
            <h2 className="text-2xl font-bold text-gray-900">
              Find your sweet home
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back to Rentel!
            </h1>
            <p className="text-sm text-gray-500 mb-6">Sign in your account</p>

            <form onSubmit={handleLogin} className="space-y-4 w-full">
              <input
                type="email"
                placeholder="Enter Your Gmail Address"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-4 text-gray-400 cursor-pointer select-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm gap-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-red-600" />
                  Remember Me
                </label>
                <a href="#" className="text-red-600 hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-medium"
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => {
                  window.location.href = "http://localhost:3000/auth/google";
                }}
                className="w-full flex items-center justify-center gap-2 py-2 mt-4 border rounded-lg bg-white hover:bg-gray-100"
              >
                <FcGoogle className="text-2xl" />
                Continue with Google
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-8 px-4 md:px-0">
              Don’t have any account?{" "}
              <Link
                to="/signup"
                className="text-red-600 font-medium hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
