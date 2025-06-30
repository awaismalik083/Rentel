import mongoose from "mongoose";

const propertyModel = mongoose.Schema({
    userId:{type:String,required:true},
    Image:{type:Image,required:true},
    location:{type:String, required:true},
    price:{type:String,required:true},
    propertyDescription:{type:String,required:true}

})