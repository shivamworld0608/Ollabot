import UploadedFile from "../models/uploadedfile.js";
export const getUploadedFiles = async (req, res) => {
  try {
    console.log("fg");
    const files = await UploadedFile.find().sort({ createdAt: -1 }); // recent first
    console.log(files);
    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch uploaded files', details: err.message });
  }
};
