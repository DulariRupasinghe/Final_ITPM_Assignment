const express = require('express');
const {
  createTicket,
  getAllTickets,
  getTicketById,
  getTicketsByEmail,
  updateTicketStatus,
  replyToTicket,
  rateTicket,
  deleteTicket,
  getTicketStats,
} = require('../controllers/supportController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes (no authentication needed for creating tickets)
router.post('/create', createTicket);
router.get('/my-tickets/:email', getTicketsByEmail);
router.post('/tickets/:id/rate', rateTicket);

// Admin only routes
router.get('/tickets', getAllTickets);
router.get('/tickets/:id', getTicketById);
router.put('/tickets/:id/status', updateTicketStatus);
router.post('/tickets/:id/reply', replyToTicket);
router.delete('/tickets/:id', deleteTicket);
router.get('/stats', getTicketStats);

module.exports = router;