import sellerModel from "../models/sellerModel.js";
import validator from "validator";

// Create a new seller profile
const createSeller = async (req, res) => {
  const { name, email, image, phone, address } = req.body;

  try {
    console.log("Decoded token:", req.user); // Token decoded by authMiddleware
    console.log("Received body:", req.body); // Log incoming data

    // 1. Check all required fields
    if (!name || !email || !image || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: "Please Fill Out all details",
      });
    }

    // 2. Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // 3. Check if seller already exists
    const existingSeller = await sellerModel.findOne({ email });
    if (existingSeller) {
      return res.status(409).json({
        success: false,
        message: "Seller already exists with this email",
      });
    }

    // 4. Create and save new seller
    const newSeller = new sellerModel({
      name,
      email,
      image,
      phone,
      address,
    });

    const savedSeller = await newSeller.save();

    // 5. Return response
    return res.status(201).json({
      success: true,
      message: "Seller profile created",
      seller: savedSeller,
    });

  } catch (error) {
    console.error("Seller creation error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while creating seller",
    });
  }
};

export default createSeller;
