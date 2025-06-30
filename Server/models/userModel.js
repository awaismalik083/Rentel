import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { 
        type: String, 
        required: true,
        minlength: 8,
       
    }
});



const userModel = mongoose.model("userSchema", userSchema);
export default userModel;