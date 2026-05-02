const express = require('express');
const {
  submitApplication,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
  getAdmissionStats
} = require('../controllers/admissionController');
const { protect, admin } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const router = express.Router();

// Public routes
router.post('/apply', upload.fields([
  { name: 'olResultSheet', maxCount: 1 },
  { name: 'alResultSheet', maxCount: 1 }
]), submitApplication);

// Admin only routes
router.get('/applications', getApplications);
router.get('/applications/:id', getApplicationById);
router.put('/applications/:id/status', updateApplicationStatus);
router.delete('/applications/:id', deleteApplication);
router.get('/stats', getAdmissionStats);

module.exports = router;