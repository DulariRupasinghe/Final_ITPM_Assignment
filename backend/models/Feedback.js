const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  studentId: String,
  lecturerName: String,
  moduleName: String,
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
