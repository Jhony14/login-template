const jwt = require('jsonwebtoken');
const Config = require('../config');

exports.getUserToken = (user) => {
  const payload = {
    email: user.email,
    userId: user._id.toString()
  };

  const token = jwt.sign(payload, Config.JWT_SECRET, { expiresIn: Config.TOKEN_EXPIRES_IN });

  return token;
};
