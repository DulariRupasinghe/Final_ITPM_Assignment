const express = require('express');
const { getSettings, updateSettings, initSettings } = require('../controllers/settingController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getSettings);
router.put('/', updateSettings);
router.post('/init', initSettings);

module.exports = router;