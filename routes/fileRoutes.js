const express = require('express');
const router = express.Router();
const { uploadFile, listFiles, downloadFile } = require('../controllers/fileController');
const { auth, checkRole } = require('../middleware/validators');
const upload = require('../config/multer');

router.post('/upload', auth, checkRole('ops'), upload.single('file'), uploadFile);
router.get('/list', auth, listFiles);
router.get('/download/:id', auth, downloadFile);

module.exports = router;