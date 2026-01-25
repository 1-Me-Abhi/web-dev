import connectDB from "./db/index.js";

connectDB();
// a




// import express from "express";
// const app = express();


// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}`);
//     console.log("Connected to MongoDB");
//     app.on("error",(error)=>{
//       console.error("Failed to connect to MongoDB");
//     })
//     app.listen(process.env.PORT, () => {
//       console.log(`Server is running on port ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// })();