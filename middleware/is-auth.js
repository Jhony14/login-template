const jwt = require('jsonwebtoken');
const Config = require('../config');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Authorization header is missing');
    error.statusCode = 401;
    return next(error);
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    const error = new Error('Token is missing');
    error.statusCode = 401;
    return next(error);
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, Config.JWT_SECRET);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      const error = new Error('Token has expired');
      error.statusCode = 401;
      return next(error);
    }
    return next(err);
  }

  if (!decodedToken) {
    const error = new Error('Invalid token');
    error.statusCode = 401;
    return next(error);
  }

  req.userId = decodedToken.userId;
  next();
};