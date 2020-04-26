const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const User = require('../resources/users/user.model');
const createError = require('http-errors');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      throw new createError.Unauthorized('Unauthorized');
    }
    console.log('Authorization:::: ', req.header('Authorization').split(' ')[1]);
    const token = req.header('Authorization').split(' ')[1];
    if (!token) {
      throw new createError.Unauthorized('Unauthorized');
    }

    const data = jwt.verify(token, JWT_SECRET_KEY);
    console.log('data, ', data);
    const user = await User.findOne({ _id: data.userId, token });
    if (!user) {
      throw new createError.Unauthorized('Unauthorized');
    }

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = auth;
