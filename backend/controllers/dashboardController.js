const User = require('../models/User');
const Application = require('../models/Application');
const Course = require('../models/Course');
const Event = require('../models/Event');
const SupportTicket = require('../models/SupportTicket');
const Attendance = require('../models/Attendance');
const Requirement = require('../models/Requirement');

exports.getDashboardStats = async (req, res) => {
  try {
    const [
      userCount,
      studentCount,
      applicationCount,
      pendingApplications,
      acceptedApplications,
      rejectedApplications,
      courseCount,
      eventCount,
      ticketCount,
      requirementCount,
      attendanceStats
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'student' }),
      Application.countDocuments(),
      Application.countDocuments({ status: 'pending' }),
      Application.countDocuments({ status: 'accepted' }),
      Application.countDocuments({ status: 'rejected' }),
      Course.countDocuments(),
      Event.countDocuments(),
      SupportTicket.countDocuments({ status: 'open' }),
      Requirement.countDocuments(),
      Attendance.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            present: { $sum: { $cond: [{ $eq: ["$status", "PRESENT"] }, 1, 0] } }
          }
        }
      ])
    ]);

    const attendanceRate = attendanceStats.length > 0 
      ? ((attendanceStats[0].present / attendanceStats[0].total) * 100).toFixed(1) + '%'
      : '0%';

    res.json({
      success: true,
      stats: {
        users: userCount,
        students: studentCount,
        applications: applicationCount,
        pending: pendingApplications,
        accepted: acceptedApplications,
        rejected: rejectedApplications,
        courses: courseCount,
        events: eventCount,
        openTickets: ticketCount,
        requirements: requirementCount,
        attendanceRate
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
