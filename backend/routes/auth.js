import express from "express";
import passport from "passport";
const router=express.Router();
import jwt from "jsonwebtoken";

import { login, logout } from "../controllers/auth.js";

// Initiate Google OAuth
router.get('/google',passport.authenticate('google', { scope: ['profile', 'email'] }));
  
  // Google OAuth Callback
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
      const authtoken = jwt.sign({ userId: req.user._id, userType: "User" },process.env.JWT_SECRET,{ expiresIn: '1d' });
      res.cookie("authtoken", authtoken, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    }); 
      res.redirect(`${process.env.CLIENT_URL}/auth/success`);
    }
  );

  // Get current user
  router.get('/user', (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'No token provided' });
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.json({name: decoded.name, userType:decoded.userType});
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  });
  
  router.post('/admin-login',login);
  router.get('/logout',logout);

export default router;