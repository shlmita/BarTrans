const express = require('express');
const router = express.Router();
const wisataController = require('../controllers/wisataController');

router.get('/', wisataController.getWisata);
router.post('/', wisataController.createWisata);
router.put('/:id', wisataController.updateWisata);
router.delete('/:id', wisataController.deleteWisata);

module.exports = router;