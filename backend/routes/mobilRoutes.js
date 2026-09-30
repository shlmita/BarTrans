const express = require('express');
const router = express.Router();
const mobilController = require('../controllers/mobilController');

router.get('/', mobilController.getMobil);

// 🔥 TAMBAHAN: Mendaftarkan rute POST, PUT, dan DELETE
router.post('/', mobilController.createMobil);
router.put('/:id', mobilController.updateMobil);
router.delete('/:id', mobilController.deleteMobil);

module.exports = router;