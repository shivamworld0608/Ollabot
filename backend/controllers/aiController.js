const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

exports.uploadPDF = async (req, res) => {
  try {
    console.log(req.file);
    const form = new FormData();
    form.append("file", fs.createReadStream(req.file.path));
    console.log("hello i reached here");
    const response = await axios.post("http://localhost:8000/upload", form, {
      headers: form.getHeaders(),
    });
     console.log("call to ai server completed with success");
    fs.unlinkSync(req.file.path); // Clean up temp file
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to upload PDF", details: err.message });
  }
};

exports.queryLLM = async (req, res) => {
  try {
    console.log("hello");
    console.log("Raw body:", req.body);
    console.log("Raw file:", req.file);

    const question  = req.body.question || req.body.message;
    const file = req.file;

    console.log("question:", question, "file:", file?.filename || 'none');
    
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const response = await axios.get("http://localhost:8000/query", {
      params: { q: question },
    });

    console.log("call to ai server completed with success",response.data);
    res.json(response.data);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Server busy, please try again later", details: err.message });
  }
};
