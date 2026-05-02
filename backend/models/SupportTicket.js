const mongoose = require('mongoose');

const supportTicketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  phone: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
  },
  category: {
    type: String,
    enum: ['general', 'admissions', 'academic', 'technical', 'financial', 'career', 'complaint', 'other'],
    default: 'general',
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'resolved', 'closed'],
    default: 'open',
  },
  adminResponse: {
    message: String,
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    respondedAt: Date,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  feedback: String,
  ticketNumber: {
    type: String,
    unique: true,
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

supportTicketSchema.pre('save', function() {
  this.updatedAt = Date.now();
  if (!this.ticketNumber) {
    this.ticketNumber = `TKT${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }
});

module.exports = mongoose.model('SupportTicket', supportTicketSchema);