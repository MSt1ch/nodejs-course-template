const uuid = require('uuid');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SALT_ROUNDS, JWT_SECRET_KEY } = require('../../common/config');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
    },
    login: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minLength: 5
    },
    _id: {
      type: String,
      default: uuid
    },
    token: {
      type: String
    }
  },
  { versionKey: false }
);

userSchema.pre('save', async function(next) { //eslint-disable-line
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, +SALT_ROUNDS);
  }
  next();
});

userSchema.methods.generateAuthToken = async function() { //eslint-disable-line
  const user = this;
  const token = jwt.sign(
    { userId: user._id, login: user.login },
    JWT_SECRET_KEY
  );
  user.token = token;
  await user.save();
  return token;
};

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
