const SupportTicket = require('../models/SupportTicket');
const nodemailer = require('nodemailer');

// @desc    Create support ticket
// @route   POST /api/support/create
const createTicket = async (req, res) => {
  try {
    const ticket = await SupportTicket.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Support ticket created successfully',
      ticket: {
        _id: ticket._id,
        ticketNumber: ticket.ticketNumber,
        name: ticket.name,
        email: ticket.email,
        subject: ticket.subject,
        status: ticket.status,
        createdAt: ticket.createdAt,
      },
    });
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Get all tickets (Admin)
// @route   GET /api/support/tickets
const getAllTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: tickets.length,
      tickets,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get ticket by ID
// @route   GET /api/support/tickets/:id
const getTicketById = async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }
    res.json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get tickets by email
// @route   GET /api/support/my-tickets/:email
const getTicketsByEmail = async (req, res) => {
  try {
    const tickets = await SupportTicket.find({ email: req.params.email }).sort({ createdAt: -1 });
    res.json({ success: true, tickets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update ticket status
// @route   PUT /api/support/tickets/:id/status
const updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const ticket = await SupportTicket.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }
    res.json({ success: true, message: 'Status updated successfully', ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Admin reply to ticket
// @route   POST /api/support/tickets/:id/reply
const replyToTicket = async (req, res) => {
  try {
    const { message } = req.body;
    const ticket = await SupportTicket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }
    
    ticket.adminResponse = {
      message,
      respondedBy: req.user?.id,
      respondedAt: Date.now(),
    };
    ticket.status = 'in_progress';
    ticket.updatedAt = Date.now();
    await ticket.save();
    
    // Dispatch Email Notification via Nodemailer (Ethereal test)
    try {
      let testAccount = await nodemailer.createTestAccount();
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, 
        auth: {
          user: testAccount.user, 
          pass: testAccount.pass, 
        },
      });

      let info = await transporter.sendMail({
        from: '"University Support" <support@university.edu>',
        to: ticket.email,
        subject: `Update on your ticket: [${ticket.ticketNumber}] ${ticket.subject}`,
        text: `Dear ${ticket.name},\n\nOur support team has replied to your ticket regarding "${ticket.subject}".\n\nAdmin Message:\n${message}\n\nBest regards,\nUniversity Support Team`,
      });
      console.log("Support Email sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (emailError) {
      console.error("Failed to send support email: ", emailError);
    }
    
    res.json({
      success: true,
      message: 'Reply sent successfully',
      ticket,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add rating to ticket
// @route   POST /api/support/tickets/:id/rate
const rateTicket = async (req, res) => {
  try {
    const { rating, feedback } = req.body;
    const ticket = await SupportTicket.findByIdAndUpdate(
      req.params.id,
      { rating, feedback, updatedAt: Date.now() },
      { new: true }
    );
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }
    res.json({ success: true, message: 'Rating submitted successfully', ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete ticket
// @route   DELETE /api/support/tickets/:id
const deleteTicket = async (req, res) => {
  try {
    await SupportTicket.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get ticket statistics
// @route   GET /api/support/stats
const getTicketStats = async (req, res) => {
  try {
    const total = await SupportTicket.countDocuments();
    const open = await SupportTicket.countDocuments({ status: 'open' });
    const inProgress = await SupportTicket.countDocuments({ status: 'in_progress' });
    const resolved = await SupportTicket.countDocuments({ status: 'resolved' });
    const closed = await SupportTicket.countDocuments({ status: 'closed' });
    
    const avgRatingResult = await SupportTicket.aggregate([
      { $match: { rating: { $exists: true, $ne: null } } },
      { $group: { _id: null, avg: { $avg: '$rating' } } }
    ]);
    
    res.json({
      success: true,
      stats: { 
        total, 
        open, 
        inProgress, 
        resolved, 
        closed, 
        avgRating: avgRatingResult[0]?.avg ? avgRatingResult[0].avg.toFixed(1) : 0 
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  getTicketsByEmail,
  updateTicketStatus,
  replyToTicket,
  rateTicket,
  deleteTicket,
  getTicketStats,
};