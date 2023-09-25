const { body, validationResult } = require('express-validator');
const config = require('../config');
const Define = require('../define/define');
const User = require('../models/user');

exports.catchValidation = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(Define.errValidationFailed);
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
};

exports.signupValidator = [
  body('email')
    .isEmail()
    .withMessage('Invalid email format')
    .custom((value, { req }) => {
      return User.findOne({ email: value })
        .then(userDoc => {
          if (userDoc) {
            return Promise.reject('Email already exists');
          }
        });
    })
    .normalizeEmail(),

  body('password')
    .trim()
    .isLength({ min: config.PASSWORD_MIN_LENGTH })
    .withMessage(`Password must be at least ${config.PASSWORD_MIN_LENGTH} characters long`),

  body('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Name cannot be empty')
];

exports.loginValidator = [
  body('email')
    .isEmail()
    .withMessage('Invalid email format'),

  body('password')
    .trim()
    .isLength({ min: config.PASSWORD_MIN_LENGTH })
    .withMessage(`Password must be at least ${config.PASSWORD_MIN_LENGTH} characters long`)
];

exports.updateUserValidator = [
  body('name')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Name cannot be empty')
];

exports.emailValidator = [
  body('email')
    .isEmail()
    .withMessage('Invalid email format')
];

exports.changePasswordValidator = [
  body('oldPassword')
    .trim()
    .isLength({ min: config.PASSWORD_MIN_LENGTH })
    .withMessage(`Old password must be at least ${config.PASSWORD_MIN_LENGTH} characters long`),

  body('newPassword')
    .trim()
    .isLength({ min: config.PASSWORD_MIN_LENGTH })
    .withMessage(`New password must be at least ${config.PASSWORD_MIN_LENGTH} characters long`)
];
