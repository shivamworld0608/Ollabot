import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: {
     type: String
     },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
