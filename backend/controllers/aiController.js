import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import UploadedFile from "../models/uploadedfile.js";

export const uploadPDF = async (req, res) => {
  try {
    const form = new FormData();
    form.append("file", fs.createReadStream(req.file.path));
    const response = await axios.post(`${process.env.AI_ENGINE_URL}/upload`, form, {
      headers: form.getHeaders(),
    });
    // fs.unlinkSync(req.file.path); // Clean up temp file
    const fileUrl = `/uploads/${req.file.filename}`;

    const savedFile = await UploadedFile.create({
      filename: req.file.originalname,
      path: fileUrl,
    });

    res.status(200).json({ message: "PDF uploaded successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to upload PDF", details: err.message });
  }
};

export const queryLLM = async (req, res) => {
  try {
    const question  = req.body.question || req.body.message;
    const file = req.file;

    console.log("question:", question, "file:", file?.filename || 'none');
    
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const response = await axios.get(`${process.env.AI_ENGINE_URL}/query`, {
      params: { q: question },
    });

    console.log("call to ai server completed with success",response.data,response.data.answer.sources);
    res.json(response.data);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Server busy, please try again later", details: err.message });
  }
};
