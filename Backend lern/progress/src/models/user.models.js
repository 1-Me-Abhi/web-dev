import mongoose from "mongoose";

const userSchemsa =new mongoose.Schema({

  name:{
    type: String,
    required: true,

  },
  email:{
    type : String,
    required:true,

  },
  pasword:{
    type: String,
    required:true,
  }
},{timestamps:true})

export const userSchema=mongoose.model("User",userSchemsa)