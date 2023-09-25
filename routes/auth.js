const express = require('express');

const authController = require('../controllers/auth');
const validator = require('../utils/validator');

const router = express.Router();

// Test route (GET)
router.get('/test', (req, res, next) => {
  res.status(200).json({ message: 'Test success' });
});

// Signup route (POST)
router.post('/signup', validator.signupValidator, authController.signup);

// Login route (POST)
router.post('/login', validator.loginValidator, authController.login);

module.exports = router;
