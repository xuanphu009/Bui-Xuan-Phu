const mongoose = require("mongoose");

const connectDB = async ()=>{
 if(!process.env.MONGO_URI){
  throw new Error("Missing MONGO_URI in environment");
 }

 try{
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected");
 }catch(error){
  const message = error?.message || "Unknown MongoDB connection error";
  throw new Error(`MongoDB connection failed: ${message}`);
 }

};

module.exports=connectDB;