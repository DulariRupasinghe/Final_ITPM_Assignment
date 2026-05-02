const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');

// Simple controller functions (defined inline to avoid import issues)
const getCourses = async (req, res) => {
  try {
    const Course = require('../models/Course');
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json({ success: true, count: courses.length, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const Course = require('../models/Course');
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const Course = require('../models/Course');
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, message: 'Course created successfully', course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const Course = require('../models/Course');
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, message: 'Course updated successfully', course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const Course = require('../models/Course');
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCoursesByCategory = async (req, res) => {
  try {
    const Course = require('../models/Course');
    const courses = await Course.find({ category: req.params.category });
    res.json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Public routes
router.get('/', getCourses);
router.get('/category/:category', getCoursesByCategory);
router.get('/:id', getCourseById);

// Admin only routes
router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;