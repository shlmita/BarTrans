const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/users', authController.getAllAkun);
router.patch('/users/:id/status', authController.toggleStatus);

router.patch('/users/:id/profile', authController.updateProfile);

module.exports = router;