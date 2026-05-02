const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  category: {
    type: String,
    enum: ['general', 'appearance', 'notifications', 'security', 'language'],
    default: 'general',
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

settingSchema.pre('save', function() {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model('Setting', settingSchema);