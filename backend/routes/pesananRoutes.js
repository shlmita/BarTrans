const express = require('express');
const router = express.Router();
const pesananController = require('../controllers/pesananController');

router.get('/', pesananController.getPesanan);
router.put('/:id/status', pesananController.updateStatus);

// 🔥 TAMBAHAN BARU: Menerima request POST dari PaymentModal
router.post('/', pesananController.createPesanan);

router.delete('/:id', pesananController.deletePesanan);

module.exports = router;