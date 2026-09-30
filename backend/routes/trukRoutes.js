const express = require('express');
const router = express.Router();
const trukController = require('../controllers/trukController');

router.get('/', trukController.getTruk);
router.post('/', trukController.createTruk);
router.put('/:id', trukController.updateTruk);
router.delete('/:id', trukController.deleteTruk);

module.exports = router;