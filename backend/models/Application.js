const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  // Personal Information
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  dateOfBirth: String,
  gender: String,
  // Academic Information
  program: { type: String, required: true },
  
  // Document References (URLs to uploaded files)
  olResultSheetUrl: String,
  alResultSheetUrl: String,
  
  // Status
  status: { 
    type: String, 
    enum: ['pending', 'reviewing', 'accepted', 'rejected'], 
    default: 'pending' 
  },
  adminNotes: String,
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviewedAt: Date,
  acceptedAt: Date,
  
  applicationDate: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);