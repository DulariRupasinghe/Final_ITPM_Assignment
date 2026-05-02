const User = require('../models/User');
const Attendance = require('../models/Attendance');
const Course = require('../models/Course');
const Event = require('../models/Event');

exports.getStudentDashboardData = async (req, res) => {
  try {
    const student = await User.findById(req.params.id)
      .populate('enrolledCourses')
      .select('-password');

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // Fetch Attendance Stats
    const attendanceStats = await Attendance.aggregate([
      { $match: { studentId: student.studentId || student._id.toString() } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          present: { $sum: { $cond: [{ $eq: ["$status", "PRESENT"] }, 1, 0] } }
        }
      }
    ]);

    const stats = attendanceStats.length > 0 
      ? {
          total: attendanceStats[0].total,
          present: attendanceStats[0].present,
          percentage: ((attendanceStats[0].present / attendanceStats[0].total) * 100).toFixed(1)
        }
      : { total: 0, present: 0, percentage: '0.0' };

    // Fetch Recent Events
    const events = await Event.find().sort({ date: 1 }).limit(5);

    // Mock notices for now as we don't have a Notice model yet, 
    // but we can pull from admin notes or a hardcoded list for demo
    const notices = [
      { id: 1, title: 'Semester Registration Open', date: '2026-04-20', priority: 'high', from: 'Academic Affairs' },
      { id: 2, title: 'Library Extended Hours', date: '2026-04-22', priority: 'low', from: 'Library' }
    ];

    res.json({
      success: true,
      student,
      attendance: stats,
      events,
      notices
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
