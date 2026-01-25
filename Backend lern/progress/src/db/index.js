import mongoose from "mongoose";
import { DB_Name } from "../constent.js";

const connectDB = async () => {
  try {
     const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`);
      console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

export default connectDB;