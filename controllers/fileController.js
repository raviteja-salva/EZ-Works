const File = require('../models/File');
const path = require('path');
const fs = require('fs').promises;

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = new File({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      fileType: path.extname(req.file.originalname).substring(1),
      size: req.file.size,
      uploadedBy: req.user._id
    });

    await file.save();
    res.status(201).json({ message: 'File uploaded successfully', file });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading file' });
  }
};

exports.listFiles = async (req, res) => {
  try {
    const files = await File.find().populate('uploadedBy', 'email');
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching files' });
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.download(file.path, file.originalName);
  } catch (error) {
    res.status(500).json({ error: 'Error downloading file' });
  }
};