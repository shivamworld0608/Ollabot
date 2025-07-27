import express from "express";
const router = express.Router();

import { restrictTo } from "../utils/restrict.js";

import { submitFeedback} from "../controllers/feedback.js";

router.post("/submit",restrictTo("User"), submitFeedback);

export default router;
