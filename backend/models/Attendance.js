const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: String,
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session'
  },
  status: {
    type: String,
    enum: ['PRESENT', 'ABSENT']
  }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
