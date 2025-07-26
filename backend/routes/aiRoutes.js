const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { uploadPDF, queryLLM } = require("../controllers/aiController.js");

router.post("/upload", upload.single("file"), uploadPDF);
router.post("/query",upload.single("file"), queryLLM);

module.exports = router;
