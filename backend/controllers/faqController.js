const Faq = require('../models/Faq');

exports.getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, faqs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createFaq = async (req, res) => {
  try {
    const faq = await Faq.create(req.body);
    res.status(201).json({ success: true, faq });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateFaq = async (req, res) => {
  try {
    const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, faq });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteFaq = async (req, res) => {
  try {
    await Faq.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'FAQ deleted' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
