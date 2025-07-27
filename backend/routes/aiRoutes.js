import express from "express";
const router = express.Router();
import { restrictTo } from "../utils/restrict.js";
import {upload} from "../config/multer.js";

import { uploadPDF, queryLLM } from "../controllers/aiController.js";

router.post("/upload",restrictTo("Admin"), upload.single("file"), uploadPDF);
router.post("/query",restrictTo("User"), upload.single("file"), queryLLM);

export default router;
