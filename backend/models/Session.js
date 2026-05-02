const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  moduleName: String,
  lecturerName: String,
  date: {
    type: Date,
    default: Date.now
  },
  expiryTime: Date
});

module.exports = mongoose.model('Session', sessionSchema);
