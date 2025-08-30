import Seller from "../models/sellerModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import PropertyModel from "../models/propertyModel.js";

// ✅ Define __dirname manually (ES Module fix)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Create a new seller profile
const createSeller = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const file = req.files?.image;

    if (!name || !phone || !address || !file) {
      return res.status(400).json({
        success: false,
        message: "Please fill out all fields including image",
      });
    }
    const uploadDir = path.join(__dirname, "../uploads/");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const sanitizeFilename = (name) =>
      name.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9._-]/g, "");

    const safeName = sanitizeFilename(file.name);
    const uniqueName = `${Date.now()}-${safeName}`;

    const savePath = path.join(uploadDir, uniqueName);
    const relativePath = `/uploads/${uniqueName}`;

    await file.mv(savePath); // Save file to server
    const newSeller = new Seller({
      name,
      phone,
      address,
      image: relativePath, // ✅ Save as relative URL
    });

    const savedSeller = await newSeller.save();

    return res.status(201).json({
      success: true,
      message: "Seller profile created successfully",
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



// ✅ Get seller by ID
const getSellerId = async (req, res) => {
  const { id } = req.params;
  try {
    const seller = await Seller.findById(id);
 

    if (!seller ) {
      return res.status(404).json({
        success: false,
        message: "Seller does not exist ",
      });
    }

    return res.status(200).json({
      success: true,
     
      message: "Seller found",
      seller,
    });
  } catch (error) {
    console.error("Error fetching seller:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching seller",
    });
  }
};


// ✅ Update seller
export const updateSeller = async (req, res) => {
  try {
    const { name, phone, address, sellerId } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const updateFields = {};
    if (name) updateFields.name = name;
    if (phone) updateFields.phone = phone;
    if (address) updateFields.address = address;
    if (image) updateFields.image = image;

    const updatedSeller = await Seller.findByIdAndUpdate(
      sellerId,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedSeller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found for this user.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Seller updated successfully",
      seller: updatedSeller,
    });
  } catch (error) {
    console.error("Update seller error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating seller",
    });
  }
};

// ✅ Delete seller
const deleteSeller = async (req, res) => {
  try {
    const { sellerId } = req.body;

    const deletedSeller = await Seller.findByIdAndDelete(sellerId);

    if (!deletedSeller) {
      return res.status(404).json({
        success: false,
        message: "Seller account not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Seller account deleted successfully",
    });
  } catch (error) {
    console.error("Delete seller error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting seller account",
    });
  }
};

export default { createSeller, getSellerId, updateSeller, deleteSeller };
