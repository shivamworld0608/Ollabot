import Admin from "../models/admin.js";
import jwt from "jsonwebtoken";

export const login=async(req,res)=>{
    try{
    const {email,password}=req.body;
    const admin= await Admin.findOne({email});
    if(!admin){
        res.status(401).json({message:"Admin not exist"});
    }
    if(admin.password!==password){
        res.status(401).json({message:"Invalid password"});
    }
    const authtoken = jwt.sign({ userId: admin.id, userType: "Admin" },process.env.JWT_SECRET,{ expiresIn: '15d' });
    if(!authtoken){
       res.status(401).json({message:"Token not generated"});
    }
    res.cookie("authtoken", authtoken, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    });
    res.status(200).json({success: true, message: "Login Successful", user: null, userType: 'Admin' });
}
    catch(err){
        console.log(err);
    }
}

export const logout = (req, res) => {
    res.cookie('authtoken', '', { httpOnly: true, expires: new Date(0), path: '/' });
    res.status(200).json({ message: 'Logged out successfully' });
  }