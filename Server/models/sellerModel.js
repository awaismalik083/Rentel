// models/sellerModel.js
import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  phone: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        // Format: +92 followed by 10 digits
        return /^\+92\d{10}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid Pakistani phone number!`,
    },
  },
  address: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Seller = mongoose.model("Seller", sellerSchema);
export default Seller;
