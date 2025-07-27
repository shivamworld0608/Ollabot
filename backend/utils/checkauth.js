import Admin from "../models/admin.js";
import User from "../models/user.js";

export const checkAuth = async (req, res) => {
    console.log("ho");
  const admin= await Admin.findById(req.user.userId);
  const user= await User.findById(req.user.userId);
  console.log("reacheed here");
   if (!user && !admin) {
       return res.status(401).json({ message: "User not found" });
   }
  const userdata = user || admin;
  console.log(userdata);
  res.status(200).json({ message: 'Authenticated', user: userdata, userType:req.user.userType });
}