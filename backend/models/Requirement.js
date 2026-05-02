const mongoose = require('mongoose');

const requirementSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['undergraduate', 'graduate', 'international', 'documents', 'general'],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  items: [{
    text: String,
    required: Boolean,
    icon: String,
  }],
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

requirementSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Requirement', requirementSchema);
