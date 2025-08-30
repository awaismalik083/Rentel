import express from "express";
import {
  UploadProperty,
  getProperty,
  updateProperty,
  deleteProperty,
  deletePropertiesBySellerId,
  getPropertyCount,
  getAllProperties,
  getAllPropertiesWithoutSeller
} from "../controllers/PropertyController.js";

const router = express.Router();

// Route for creating property http://localhost:3000/api/property/upload
router.post("/upload", UploadProperty);

// Route for getting single property by ID http://localhost:3000/api/property/getproperty/:id
router.get("/getproperty/:id", getProperty);

// Route for deleting property by ID http://localhost:3000/api/property/deleteproperty/:id
router.delete("/deleteproperty/:id", deleteProperty);

// Route for deleting all properties by sellerId http://localhost:3000/api/property/deletebyseller/:sellerId
router.delete("/deletebyseller/:sellerId", deletePropertiesBySellerId);

// Route for updating property by ID http://localhost:3000/api/property/updateproperty/:id
router.put("/updateproperty/:id", updateProperty);

// Route for getting property count for a seller http://localhost:3000/api/property/getpropertycount
router.get("/getpropertycount", getPropertyCount);

// Route for getting all properties of a specific seller http://localhost:3000/api/property/getAllProperties/id
// ✅ updated route:
router.get("/getAllProperties/:SellerId", getAllProperties);

// Route for getting all properties without seller filter http://localhost:3000/api/property/getAllPropertiesWithoutSeller
router.get("/getAllPropertiesWithoutSeller", getAllPropertiesWithoutSeller);

export default router;
