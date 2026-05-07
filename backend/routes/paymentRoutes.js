const express = require('express');
const router = express.Router();
const controller = require('../controllers/paymentController');

router.post('/', controller.createPayment);
router.get('/', controller.getPayments);
router.get('/student/:studentId', controller.getStudentPayments);

module.exports = router;
