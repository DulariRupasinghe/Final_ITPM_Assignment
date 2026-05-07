const Feedback = require('../models/Feedback');

// ✅ Submit feedback
exports.submitFeedback = async (req, res) => {
  try {
    const { studentId, lecturerName, moduleName, rating, comment } = req.body;

    const feedback = new Feedback({
      studentId,
      lecturerName,
      moduleName,
      rating,
      comment
    });

    await feedback.save();

    res.json({ message: "Feedback submitted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error submitting feedback" });
  }
};

// ✅ Get feedback by lecturer
exports.getFeedbackByLecturer = async (req, res) => {
  try {
    const { lecturerName } = req.params;

    const feedbacks = await Feedback.find({ lecturerName });

    const avg =
      feedbacks.reduce((sum, f) => sum + f.rating, 0) /
      (feedbacks.length || 1);

    res.json({
      lecturerName,
      averageRating: avg.toFixed(2),
      feedbacks
    });

  } catch (err) {
    res.status(500).json({ message: "Error fetching feedback" });
  }
};

// ✅ Get feedback by module
exports.getFeedbackByModule = async (req, res) => {
  try {
    const { moduleName } = req.params;

    const feedbacks = await Feedback.find({ moduleName });

    res.json(feedbacks);

  } catch (err) {
    res.status(500).json({ message: "Error fetching feedback" });
  }
};

exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json({ success: true, feedbacks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
