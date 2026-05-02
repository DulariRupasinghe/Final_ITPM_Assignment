const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  studentId: String,
  studentName: String,
  email: String,
  courseName: String,
  amount: Number,
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'completed' // Mocking immediate success for now
  },
  paymentMethod: String,
  transactionId: {
    type: String,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', paymentSchema);
