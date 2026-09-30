const express = require('express');
const router = express.Router();
const testimoniController = require('../controllers/testimoniController');

router.get('/', testimoniController.getTestimoni);
router.post('/', testimoniController.createTestimoni);
router.put('/:id/status', testimoniController.updateStatus);
router.delete('/:id', testimoniController.deleteTestimoni);

module.exports = router;