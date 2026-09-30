const express = require('express');
const router = express.Router();
const penginapanController = require('../controllers/penginapanController');

router.get('/', penginapanController.getAllPenginapan);
router.post('/', penginapanController.createPenginapan);
router.put('/:id', penginapanController.updatePenginapan);
router.delete('/:id', penginapanController.deletePenginapan);

module.exports = router;