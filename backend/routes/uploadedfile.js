import express from "express";
const router = express.Router();

import { getUploadedFiles} from "../controllers/uploadedfile.js";
import { restrictTo } from "../utils/restrict.js";

router.get("/get",restrictTo("Admin"),  getUploadedFiles);

export default router;
