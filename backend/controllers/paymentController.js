const Payment = require('../models/Payment');

exports.createPayment = async (req, res) => {
  try {
    const { studentId, studentName, email, courseName, amount, paymentMethod } = req.body;
    
    const transactionId = 'TXN-' + Math.floor(Math.random() * 10000000);
    
    const payment = new Payment({
      studentId,
      studentName,
      email,
      courseName,
      amount,
      paymentMethod,
      transactionId
    });
    
    await payment.save();
    
    res.status(201).json({
      success: true,
      message: 'Payment recorded successfully',
      transactionId
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ date: -1 });
    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStudentPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ studentId: req.params.studentId }).sort({ date: -1 });
    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
