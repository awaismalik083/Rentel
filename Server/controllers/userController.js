import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Create JWT Token
const createToken = (id) => {
  const jwtSecret = process.env.JWT_SECRET;
  return jwt.sign({ id }, jwtSecret, { expiresIn: "1d" });
};

// Login user
const loginuser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.status(200).json({ success: true, token });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address" });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating new user
    const newuser = new userModel({
      name:name,
      email:email,
      password: hashedPassword,
    });

    const user = await newuser.save();
    const token = createToken(user._id);

    res.status(201).json({
      success: true,
      token,
      message: "User created successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


//get user data

const getUserData = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId).select("-password"); // exclude password if needed
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user data",
      error: error.message
    });
  }
};



export { loginuser, registerUser, createToken,getUserData };
