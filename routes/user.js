const express = require('express');

const userController = require('../controllers/user');
const validator = require('../utils/validator');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// Retrieve user information (GET)
router.get('/:userId', isAuth, userController.getUserInfo);

// Update user information (PUT)
router.put('/', isAuth, validator.updateUserValidator, userController.putUpdateUserInfo);

// Change password (PUT)
router.put('/changepassword', isAuth, validator.changePasswordValidator, userController.putChangePassword);

// Forgot password (POST)
router.post('/forgotpassword', validator.emailValidator, userController.postForgotPassword);

module.exports = router;
