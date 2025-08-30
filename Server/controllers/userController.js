import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const createToken = (id) => {
  const jwtSecret = process.env.JWT_SECRET;
  return jwt.sign({ id }, jwtSecret, { expiresIn: "1d" });
};

// ✅ Login user
const loginuser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.password === "google-oauth") {
      return res.status(403).json({ success: false, message: "Please login with Google" });
    }

    const isMatch = await bcrypt.compare(password, user.password); // ✅ Fixed await

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.status(200).json({ success: true, token });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password too short" });
    }

    const exist = await userModel.findOne({ email });

    if (exist) {
      if (exist.isVerified) {
        return res.status(400).json({ success: false, message: "User already exists" });
      }
      return res.status(403).json({ success: false, message: "Email verification pending" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      isVerified: true,
    });

    const token = createToken(newUser._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Get user data
const getUserData = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching user", error: error.message });
  }
};

export { loginuser, registerUser, createToken, getUserData };
