import express from "express";
import {
  createOrUpdateChat,
  editQueryInChat,
  deleteChat,
  deleteQueryFromChat,
} from "../controllers/chat.js";

const router = express.Router();

router.post("/", createOrUpdateChat);
router.put("/:chatId/query/:queryId", editQueryInChat);
router.delete("/:chatId", deleteChat);
router.delete("/:chatId/query/:queryId", deleteQueryFromChat);

export default router;
