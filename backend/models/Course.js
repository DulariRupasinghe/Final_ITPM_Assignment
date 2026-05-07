const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  category: { type: String, enum: ['technology', 'business', 'engineering', 'science', 'arts', 'healthcare'], required: true },
  degree: { type: String, required: true },
  duration: { type: String, required: true },
  credits: { type: Number, default: 120 },
  fee: { type: Number, default: 8000 },
  seats: { type: Number, default: 60 },
  ranking: String,
  description: { type: String, required: true },
  specialFeatures: [String],
  careerPaths: [String],
  requirements: String,
  image: String,
  color: { type: String, default: 'blue' },
  jobPlacement: String,
  averageSalary: String,
  scholarships: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);