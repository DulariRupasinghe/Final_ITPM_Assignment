const express = require('express');
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsByCategory,
  getUpcomingEvents,
  registerForEvent,
} = require('../controllers/eventController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getEvents);
router.get('/upcoming', getUpcomingEvents);
router.get('/category/:category', getEventsByCategory);
router.get('/:id', getEventById);
router.post('/:id/register', protect, registerForEvent);

// Admin only routes
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;