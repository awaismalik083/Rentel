import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    SellerId: { type: String, required: true },
    Property_Type: { type: String, required: true },
    Home_Type: { type: String, required: true },
    City: { type: String, required: true },
    Location: { type: String, required: true },
    Town: { type: String },
    Street: { type: String },
    Bed: {
      type: Number,
    },
    Bath: {
      type: Number,
    },
    Purpose: {
      type: String,

      required: true,
      set: (value) => {
        // Normalize input to capitalize first letter
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      },
    },
    price: {
      type: Number,
    },
    monthlyRent: { type: Number },
    Area_Size: { type: Number, required: true },
    Area_Unit: { type: String },
    Installment_Available: {
      type: Boolean,
    },
    Additional_Features: {
      type: String,
    },
    Title: { type: String, required: true },
    Email: { type: String },
    Phone_Number_1: { type: Number, required: true },
    Phone_Number_2: { type: Number },
    Whatsapp_Number: { type: Number },

    Description: { type: String, required: true },
    Images: { type: [String], required: true }, // array of image URLs
    Video: { type: String },
    // video URL
  },
  { timestamps: true }
);

const PropertyModel = mongoose.model("Property", propertySchema);
export default PropertyModel;
