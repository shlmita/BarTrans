const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travelController');

router.get('/', travelController.getAllTravel);
router.post('/', travelController.createTravel);
router.put('/:id', travelController.updateTravel);
router.delete('/:id', travelController.deleteTravel);

// 🔥 ROUTE BARU UNTUK AUTO-CLOSE KURSI 🔥
router.put('/:id/book-seats', travelController.bookSeats);

module.exports = router;