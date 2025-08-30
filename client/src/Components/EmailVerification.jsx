import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const EmailVerification = () => {
  const email = localStorage.getItem("signupEmail"); // email saved from signup
  const navigate = useNavigate();

  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState("");

  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Handle digit input
  const handleChange = (index, value) => {
    if (/^[0-9]$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (index < 3) {
        inputs[index + 1].current.focus(); // move to next
      }
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const newCode = [...code];
      if (newCode[index] === "") {
        if (index > 0) inputs[index - 1].current.focus();
      } else {
        newCode[index] = "";
        setCode(newCode);
      }
    }
  };

  // Handle verification and registration
  const handleVerify = async () => {
    const fullCode = code.join("");
    if (fullCode.length !== 4) {
      return setError("Please enter all 4 digits");
    }

    try {
      const email = localStorage.getItem("signupEmail");
      const verifyRes = await axios.post(
        "http://localhost:3000/api/email/verify-code",
        {
          email,
          code: fullCode,
        }
      );

      if (verifyRes.data.verified) {
        // Get stored user details
        const name = localStorage.getItem("signupName");
        const password = localStorage.getItem("signupPassword");
        if (!name || !email || !password) {
          setError("Missing user data. Please sign up again.");
          return;
        }
        // Call registration API
        alert("Registering with:", { name, email, password });

        const registerRes = await axios.post(
          "http://localhost:3000/api/user/register",
          {
            name,
            email,
            password,
          }
        );

        if (registerRes.data.success) {
          localStorage.setItem("token", registerRes.data.token);
          localStorage.removeItem("signupName");
          localStorage.removeItem("signupEmail");
          localStorage.removeItem("signupPassword");

          alert("🎉 Email verified and account created!");
          navigate("/dashboard");
        } else {
          setError("❌ Could not create account. Try again.");
        }
      } else {
        setError("❌ Invalid verification code");
      }
    } catch (err) {
      setError("❌ Something went wrong. Try again.");
      console.error("Verification error:", err);
    }
  };

  return (
    <div className="bg-gray-100 w-screen h-screen">
      <div className="flex items-center justify-center pt-10">
        <div className="flex flex-col rounded-xl bg-white w-[50rem] h-[30rem] items-center space-y-5 justify-center pt-2">
          <h1 className="text-5xl absolute top-20 font-bold text-gray-600">
            Email Verification
          </h1>
          <p className="text-gray-600 text-4xl mt-10 font-bold">
            Get Your Code
          </p>
          <p className="font-medium text-gray-400 text-center">
            Please enter the 4 digit code <br /> sent to{" "}
            <span className="underline text-blue-400">{email}</span>
          </p>

          <div className="flex gap-10">
            {code.map((digit, idx) => (
              <input
                key={idx}
                ref={inputs[idx]}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="rounded-md outline-none text-center text-2xl font-bold bg-gray-200 w-[5rem] h-[3rem]"
              />
            ))}
          </div>

          {error && <p className="text-red-500 font-medium">{error}</p>}

          <p className="text-gray-400">
            Didn't receive the email?{" "}
            <Link to="/resendemail" className="text-gray-500 underline">
              Resend code
            </Link>
          </p>

          <button
            onClick={handleVerify}
            className="bg-red-500 py-3 mb-2 cursor-pointer hover:bg-red-600 text-white rounded-md w-[10rem]"
          >
            Verify and Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
