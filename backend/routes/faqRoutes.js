const express = require('express');
const router = express.Router();
const controller = require('../controllers/faqController');

router.get('/', controller.getFaqs);
router.post('/', controller.createFaq);
router.put('/:id', controller.updateFaq);
router.delete('/:id', controller.deleteFaq);

module.exports = router;
