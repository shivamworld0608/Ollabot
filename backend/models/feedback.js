import mongoose, { mongo } from "mongoose";

const feedbackSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  question: {
     type: String
     },
  answer: {
    type: String,
  },
  ishelpful: {
    type: Boolean,
  },
}, { timestamps: true });

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
