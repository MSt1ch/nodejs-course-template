const createError = require('http-errors');
const User = require('./user.model');
const { hashGenerator } = require('../../helpers');

const getAll = async () => {
  return await User.find({});
};

const createNewUser = async userData => {
  return await User.create({ ...userData });
};

const getUserById = async id => {
  const user = await User.findOne({ _id: id }).exec();
  if (!user) {
    throw new createError(404, `User with id ${id} doesn't exist!`);
  }
  return user;
};

const updateUserById = async (id, data) => {
  const { name, login, password } = data;
  const hashedPassword = await hashGenerator(password);
  return await User.updateOne(
    { _id: id },
    {
      name,
      login,
      password: hashedPassword
    }
  ).exec();
};

const deleteUserById = async id => {
  return (await User.deleteOne({ _id: id })).deletedCount;
};

const findByLogin = async login => {
  return await User.findOne({ login }).exec();
};

module.exports = {
  getAll,
  createNewUser,
  getUserById,
  updateUserById,
  deleteUserById,
  findByLogin
};
