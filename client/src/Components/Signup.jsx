import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { asset } from "../assets/asset";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";


const Signup = () => {
  const [eye, setEye] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const eyehandle = () => setEye(!eye);

   useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
          navigate('/dashboard')
        }
      }, [])
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/user/register", {
        name,
        email,
        password,
      });

      if (res.data.success) {
        alert("Account created successfully!");
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }

     
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>

      <div className="flex flex-col md:flex-row min-h-screen mt-16 font-sans">
        {/* Left Side */}
        <div className="md:w-1/2 bg-gray-100 flex flex-col justify-center items-center p-8 md:p-12">
          <img
            src={asset.sg}
            alt="Consultation"
            className="rounded-xl w-full max-w-md object-cover mb-8"
          />
          <div className="mt-10 text-center px-4 md:px-0">
            <h2 className="text-2xl font-bold text-gray-900">
              Free Consultation
            </h2>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Let us connect you with the agent in our in-built chat system to help you out.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 flex flex-col justify-center px-8 py-10 md:px-10 bg-white">
          <div className="w-full max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create your Free Account
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Submit your data for register
            </p>

            <form className="space-y-4" onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="relative">
                <input
                  type={eye ? "text" : "password"}
                  placeholder="Password"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="absolute right-4 top-4 text-gray-500 cursor-pointer select-none"
                  onClick={eyehandle}
                >
                  {eye ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-sm text-gray-500">
                <input type="checkbox" className="accent-blue-600" />
                <span>
                  I agree to <span className="text-red-600">Rentel Security</span> and{" "}
                  <span className="text-red-600">Privacy Policy</span>
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-medium"
              >
                Get Started
              </button>
            </form>

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

            <p className="text-sm text-center text-gray-500 mt-6 px-4 md:px-0">
              I have an account?{" "}
              <Link to="/login" className="text-red-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
