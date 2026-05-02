const express = require('express');
const { 
  registerUser, 
  loginUser, 
  getAllUsers, 
  getUserById, 
  updateUser, 
  deleteUser,
  createAdmin
} = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);  // Make sure this line exists
router.post('/create-admin', createAdmin);

// Protected admin routes
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;