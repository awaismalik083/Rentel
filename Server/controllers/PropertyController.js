import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import PropertyModel from "../models/propertyModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Upload Property
const UploadProperty = async (req, res) => {
  try {
    console.log("Received fields:", Object.keys(req.body));
    console.log(
      "Received files:",
      req.files ? Object.keys(req.files) : "No files"
    );

    const baseRequiredFields = [
      "SellerId",
      "Property_Type",
      "Home_Type",
      "City",
      "Location",
      "Purpose",
      "Area_Size",
      "Area_Unit",
      "Title",
      "Phone_Number_1",
      "Description",
    ];

    const missingBaseFields = baseRequiredFields.filter(
      (field) => !req.body[field]
    );
    if (missingBaseFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        missingFields: missingBaseFields,
      });
    }

    if (req.body.Purpose === "Buy" && !req.body.price) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Price is required for Buy properties",
        });
    }

    if (req.body.Purpose === "Rent" && !req.body.monthlyRent) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Monthly rent is required for Rent properties",
        });
    }

    if (!req.files || !req.files.Images) {
      return res
        .status(400)
        .json({ success: false, message: "At least one image is required" });
    }

    const {
      SellerId,
      Property_Type,
      Home_Type,
      City,
      Location,
      Town,
      Street,
      Bed,
      Bath,
      Purpose,
      price,
      monthlyRent,
      Area_Size,
      Area_Unit,
      Currency,
      Installment_Available,
      Title,
      Email,
      Phone_Number_1,
      Phone_Number_2,
      Whatsapp_Number,
      Description,
      Additional_Features,
    } = req.body;

    const images = req.files?.Images;
    const video = req.files?.Video;

    const uploadDir = path.join(__dirname, "../uploads/property/");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const saveFile = async (file) => {
      if (!file) return "";
      const safeName = file.name
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9._-]/g, "");
      const uniqueName = `${Date.now()}_${Math.round(
        Math.random() * 1e4
      )}_${safeName}`;
      const savePath = path.join(uploadDir, uniqueName);
      await file.mv(savePath);
      return `/uploads/property/${uniqueName}`;
    };

    const imageArray = [];
    if (Array.isArray(images)) {
      for (let img of images) imageArray.push(await saveFile(img));
    } else {
      imageArray.push(await saveFile(images));
    }

    const videoPath = video ? await saveFile(video) : "";

    const propertyData = {
      SellerId,
      Property_Type,
      Home_Type,
      City,
      Location,
      Installment_Available,
      Purpose,
      Area_Size,
      Area_Unit,
      Title,
      Description,
      Images: imageArray,
    };

    if (Town) propertyData.Town = Town;
    if (Street) propertyData.Street = Street;
    if (Bed) propertyData.Bed = Bed;
    if (Bath) propertyData.Bath = Bath;
    if (Email) propertyData.Email = Email;
    if (Phone_Number_1) propertyData.Phone_Number_1 = Phone_Number_1;
    if (Phone_Number_2) propertyData.Phone_Number_2 = Phone_Number_2;
    if (Whatsapp_Number) propertyData.Whatsapp_Number = Whatsapp_Number;
    if (Additional_Features)
      propertyData.Additional_Features = Additional_Features;
    if (Currency) propertyData.Currency = Currency;

    if (Purpose === "Buy") {
      propertyData.price = price;
      propertyData.Installment = Installment_Available
        ? "Available"
        : "Not Available";
    } else if (Purpose === "Rent") {
      propertyData.monthlyRent = monthlyRent;
    }

    if (videoPath) propertyData.Video = videoPath;

    const newProperty = new PropertyModel(propertyData);
    const savedProperty = await newProperty.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Property uploaded successfully",
        property: savedProperty,
      });
  } catch (error) {
    console.error("Upload property error:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error while uploading property",
        error: error.message,
      });
  }
};

// ✅ Get Property by ID
const getProperty = async (req, res) => {
  let { id } = req.params;

  // Strip surrounding quotes if accidentally passed
  id = id.replace(/^"+|"+$/g, "");

  if (!id || id.trim() === "") {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a property ID" });
  }

  try {
    const property = await PropertyModel.findById(id);
    if (!property)
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    res
      .status(200)
      .json({ success: true, message: "Property found", property });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Server error while fetching property",
        error: error.message,
      });
  }
};

// ✅ Update Property
const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Property ID is required" });
    }

    const existingProperty = await PropertyModel.findById(id);
    if (!existingProperty)
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });

    const updateFields = { ...req.body };

    const uploadDir = path.join(__dirname, "../uploads/property/");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const saveFile = async (file) => {
      if (!file) return "";
      const safeName = file.name
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9._-]/g, "");
      const uniqueName = `${Date.now()}_${Math.round(
        Math.random() * 1e4
      )}_${safeName}`;
      const savePath = path.join(uploadDir, uniqueName);
      await file.mv(savePath);
      return `/uploads/property/${uniqueName}`;
    };

    if (req.files?.Images) {
      const newImages = Array.isArray(req.files.Images)
        ? await Promise.all(req.files.Images.map(saveFile))
        : [await saveFile(req.files.Images)];
      updateFields.Images = [...(existingProperty.Images || []), ...newImages];
    }

    if (req.files?.Video) updateFields.Video = await saveFile(req.files.Video);

    const updatedProperty = await PropertyModel.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );
    res
      .status(200)
      .json({
        success: true,
        message: "Property updated successfully",
        property: updatedProperty,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Server error while updating property",
        error: error.message,
      });
  }
};

// ✅ Delete Single Property
const deleteProperty = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res
      .status(400)
      .json({ success: false, message: "Please enter a Property id" });

  try {
    const property = await PropertyModel.findByIdAndDelete(id);
    if (!property)
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    res
      .status(200)
      .json({ success: true, message: "Property deleted Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Server error while deleting property",
        error: error.message,
      });
  }
};

// ✅ Delete All Properties by Seller ID
const deletePropertiesBySellerId = async (req, res) => {
  const { sellerId } = req.params;
  if (!sellerId)
    return res
      .status(400)
      .json({ success: false, message: "Please provide a SellerId" });

  try {
    const result = await PropertyModel.deleteMany({ SellerId: sellerId });
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "No properties found for this SellerId",
        });
    }
    res
      .status(200)
      .json({
        success: true,
        message: `${result.deletedCount} properties deleted successfully`,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Server error while deleting properties",
        error: error.message,
      });
  }
};

// ✅ Get Property Count for Seller
const getPropertyCount = async (req, res) => {
  const { sellerId } = req.body;
  try {
    const count = await PropertyModel.countDocuments({ SellerId: sellerId });
    res.status(200).json({ success: true, sellerId, totalproperties: count });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get All Properties for Specific Seller
const getAllProperties = async (req, res) => {
  const { SellerId } = req.params;
  try {
    if (!SellerId)
      return res
        .status(400)
        .json({ success: false, message: "Please Enter a seller Id" });

    const properties = await PropertyModel.find({ SellerId });
    res
      .status(200)
      .json({ success: true, message: "Here are all properties", properties });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Error Occurred", error });
  }
};

// ✅ Get All Properties Without Filter
const getAllPropertiesWithoutSeller = async (req, res) => {
  try {
    const properties = await PropertyModel.find({});
    if (!properties || properties.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No properties found in database" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "All properties retrieved successfully",
        properties,
        count: properties.length,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Server error while fetching properties",
        error: error.message,
      });
  }
};

// ✅ Export all functions properly
export {
  UploadProperty,
  getProperty,
  updateProperty,
  deleteProperty,
  deletePropertiesBySellerId,
  getPropertyCount,
  getAllProperties,
  getAllPropertiesWithoutSeller,
};
