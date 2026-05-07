const express = require('express');
const router = express.Router();
const controller = require('../controllers/attendanceController');

router.post('/create-session', controller.createSession);
router.post('/qr', controller.generateQR);
router.post('/mark', controller.markAttendance);
router.get('/session/:sessionId', controller.getSessionAttendance);
router.get('/summary/:studentId', controller.getStudentSummary);
router.get('/detailed', controller.getDetailedAttendance);
router.get('/report', controller.generateReport);
router.get('/analytics', controller.getAnalytics);
router.get('/analytics/module', controller.getModuleAnalytics);
router.get('/analytics/trend', controller.getTrendAnalytics);
router.get('/analytics/report', controller.generateAnalyticsReport);
router.post('/generate-qr', controller.generateSessionQR);
router.put('/record/:id', controller.updateAttendance);
router.delete('/record/:id', controller.deleteAttendance);
router.post('/manual-mark', controller.manualMark);
router.get('/student-report', controller.generateStudentReport);

router.get('/sessions', async (req, res) => {
  try {
    const Session = require('../models/Session');
    const sessions = await Session.find().sort({ date: -1 });
    res.json(sessions);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
