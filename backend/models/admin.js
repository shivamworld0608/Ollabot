import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
}, { timestamps: true });

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
