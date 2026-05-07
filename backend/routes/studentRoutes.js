const express = require('express');
const router = express.Router();
const { getStudentDashboardData } = require('../controllers/studentController');

router.get('/dashboard/:id', getStudentDashboardData);

module.exports = router;
