const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Event name is required'],
  },
  category: {
    type: String,
    enum: ['music', 'sports', 'dance', 'outdoor', 'academic', 'cultural', 'workshop', 'other'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  organizer: {
    type: String,
  },
  contactEmail: {
    type: String,
  },
  contactPhone: {
    type: String,
  },
  capacity: {
    type: Number,
    default: 0,
  },
  registeredCount: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming',
  },
  image: {
    type: String,
    default: '',
  },
  imageUrl: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
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

eventSchema.pre('save', function() {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model('Event', eventSchema);