const express = require('express');
const router = express.Router();
const pesananController = require('../controllers/pesananController');

router.get('/', pesananController.getPesanan);
router.put('/:id/status', pesananController.updateStatus);

module.exports = router;