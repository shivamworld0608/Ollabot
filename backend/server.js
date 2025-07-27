import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import path from "path";
import passport from "./config/passport.js";

import { checkAuth } from "./utils/checkauth.js";

import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/auth.js";
import feedbackRoutes from "./routes/feedback.js";
import uplodedfileRoutes from "./routes/uploadedfile.js";


const app = express();
dotenv.config();

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

const authenticate = (req, res, next) => {
    const authtoken = req.cookies?.authtoken;
    if (!authtoken) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
      const decoded = jwt.verify(authtoken, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    }
    catch (err) {
      return res.status(401).json({ message: 'Invalid or Expired token' });
    }
  };


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
 console.log("Connected to MongoDB");
})
.catch((err)=>{
 console.error("Error connecting to MongoDB:", err);
})

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use("/check-auth",authenticate,checkAuth);

app.use("/api", authenticate, aiRoutes);
app.use("/auth",authRoutes);
app.use("/feedback",authenticate,feedbackRoutes);
app.use("/uploadedfile",authenticate,uplodedfileRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Ollabot Node.js Server running on ${PORT}`);
});
