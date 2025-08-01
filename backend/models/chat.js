import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  query:[{
  question: {
     type: String
     },
   answer: {
    type: String,
  },
   ishelpful: {
    type: Boolean,
  },}]
}, { timestamps: true });

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;