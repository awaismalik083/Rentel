// models/sellerModel.js
import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
});

const Seller = mongoose.model("Seller", sellerSchema);

export default Seller;
