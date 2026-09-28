const express = require('express');
const router = express.Router();
const mobilController = require('../controllers/mobilController');

router.get('/', mobilController.getMobil);

module.exports = router;