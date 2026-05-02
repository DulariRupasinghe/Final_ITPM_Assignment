const Requirement = require('../models/Requirement');

// @desc    Get all requirements
// @route   GET /api/requirements
const getRequirements = async (req, res) => {
  try {
    const requirements = await Requirement.find().sort({ order: 1, category: 1 });
    res.json({
      success: true,
      requirements,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get requirements by category
// @route   GET /api/requirements/category/:category
const getRequirementsByCategory = async (req, res) => {
  try {
    const requirements = await Requirement.find({ 
      category: req.params.category,
      isActive: true 
    }).sort({ order: 1 });
    res.json({
      success: true,
      requirements,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create requirement
// @route   POST /api/requirements
const createRequirement = async (req, res) => {
  try {
    const requirement = await Requirement.create({
      ...req.body,
      updatedBy: req.user.id,
    });
    res.status(201).json({
      success: true,
      message: 'Requirement created successfully',
      requirement,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update requirement
// @route   PUT /api/requirements/:id
const updateRequirement = async (req, res) => {
  try {
    const requirement = await Requirement.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedBy: req.user.id, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!requirement) {
      return res.status(404).json({ success: false, message: 'Requirement not found' });
    }
    res.json({
      success: true,
      message: 'Requirement updated successfully',
      requirement,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete requirement
// @route   DELETE /api/requirements/:id
const deleteRequirement = async (req, res) => {
  try {
    const requirement = await Requirement.findByIdAndDelete(req.params.id);
    if (!requirement) {
      return res.status(404).json({ success: false, message: 'Requirement not found' });
    }
    res.json({
      success: true,
      message: 'Requirement deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle requirement status
// @route   PATCH /api/requirements/:id/toggle
const toggleRequirementStatus = async (req, res) => {
  try {
    const requirement = await Requirement.findById(req.params.id);
    if (!requirement) {
      return res.status(404).json({ success: false, message: 'Requirement not found' });
    }
    requirement.isActive = !requirement.isActive;
    await requirement.save();
    res.json({
      success: true,
      message: `Requirement ${requirement.isActive ? 'activated' : 'deactivated'} successfully`,
      requirement,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getRequirements,
  getRequirementsByCategory,
  createRequirement,
  updateRequirement,
  deleteRequirement,
  toggleRequirementStatus,
};