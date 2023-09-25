const Bcrypt = require('bcryptjs');

const User = require('../models/user');
const Define = require('../define/define');
const ModelUtil = require('../utils/models');
const UserTokenUtil = require('../utils/user-token');
const ValidatorUtil = require('../utils/validator');
const Config = require('../config');
const Response = require('../define/response');

exports.signup = async (req, res, next) => {
  try {
    ValidatorUtil.catchValidation(req);
    const { email, name, password } = req.body;
    const avatar = req.files ? req.files.avatar : null;
    const hasAvatar = (avatar && avatar[0]);
    const avatarUrl = hasAvatar ? avatar[0].path : null;
    const hashedPw = await Bcrypt.hash(password, Config.PASSWORD_HASH_SAIL);
    const user = new User({
      email,
      password: hashedPw,
      name,
      avatar: avatarUrl
    });
    await user.save();
    Response.send(res, ModelUtil.getUser(user), 201);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    ValidatorUtil.catchValidation(req);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error(Define.errUserNotExists);
      error.statusCode = 401;
      throw error;
    }
    const isEqual = await Bcrypt.compare(password, user.password);

    if (!isEqual) {
      const error = new Error(Define.errLoginInvalid);
      error.statusCode = 401;
      throw error;
    }

    const responseData = {
      ...ModelUtil.getUser(user),
      token: UserTokenUtil.getUserToken(user)
    };
    Response.send(res, responseData);
  } catch (err) {
    next(err);
  }
};
