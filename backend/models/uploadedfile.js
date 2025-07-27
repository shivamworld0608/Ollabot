import mongoose from 'mongoose';

const uploadedFileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
},{ timestamps: true });

const UploadedFile = mongoose.model('UploadedFile', uploadedFileSchema);

export default UploadedFile;
