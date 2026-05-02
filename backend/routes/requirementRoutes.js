const express = require('express');
const {
  getRequirements,
  getRequirementsByCategory,
  createRequirement,
  updateRequirement,
  deleteRequirement,
  toggleRequirementStatus,
} = require('../controllers/requirementController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getRequirements);
router.get('/category/:category', getRequirementsByCategory);

// Admin only routes
router.post('/', createRequirement);
router.put('/:id', updateRequirement);
router.delete('/:id', deleteRequirement);
router.patch('/:id/toggle', toggleRequirementStatus);

module.exports = router;