const express = require('express');
const router = express.Router();
const controller = require('../controllers/feedbackController');

router.post('/', controller.submitFeedback);
router.get('/', controller.getAllFeedback);
router.get('/lecturer/:lecturerName', controller.getFeedbackByLecturer);
router.get('/module/:moduleName', controller.getFeedbackByModule);

module.exports = router;
