// controllers/chatController.js
import Chat from "../models/chatModel.js"; // Adjust the path to your model

// 1. Create or Update Chat
export const createOrUpdateChat = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { chatId, question, answer, ishelpful } = req.body;

    const newQuery = { question, answer, ishelpful };

    if (!chatId) {
      // Create new chat
      const chat = new Chat({
        userId,
        query: [newQuery],
      });
      const savedChat = await chat.save();
      return res.status(201).json(savedChat);
    } else {
      // Update existing chat
      const chat = await Chat.findById(chatId);
      if (!chat) return res.status(404).json({ message: "Chat not found" });

      chat.query.push(newQuery);
      const updatedChat = await chat.save();
      return res.status(200).json(updatedChat);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. Edit specific query in a chat
export const editQueryInChat = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { chatId, queryId } = req.params;
    const { question, answer, ishelpful } = req.body;

    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    if (chat.userId.toString() !== userId)
      return res.status(403).json({ message: "Unauthorized" });

    const queryItem = chat.query.id(queryId);
    if (!queryItem) return res.status(404).json({ message: "Query not found" });

    if (question !== undefined) queryItem.question = question;
    if (answer !== undefined) queryItem.answer = answer;
    if (ishelpful !== undefined) queryItem.ishelpful = ishelpful;

    const updatedChat = await chat.save();
    res.status(200).json(updatedChat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. Delete entire chat
export const deleteChat = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { chatId } = req.params;

    const deleted = await Chat.findByIdAndDelete(chatId);
    if (!deleted) return res.status(404).json({ message: "Chat not found" });

    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 4. Delete a specific query from a chat
export const deleteQueryFromChat = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { chatId, queryId } = req.params;

    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    if (chat.userId.toString() !== userId)
      return res.status(403).json({ message: "Unauthorized" });

    const queryItem = chat.query.id(queryId);
    if (!queryItem) return res.status(404).json({ message: "Query not found" });

    queryItem.remove();
    const updatedChat = await chat.save();

    res.status(200).json(updatedChat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
