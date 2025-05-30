import express from "express";
import authRoutes from "./routes/auth";
import mongoose from "mongoose";
import dotenv from "dotenv";
import documentRoutes from "./routes/document";

dotenv.config();

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.listen(5000, () => console.log("Server started"));
