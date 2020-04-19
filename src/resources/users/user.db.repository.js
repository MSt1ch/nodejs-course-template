const createError = require('http-errors');
const User = require('./user.model');

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
  return await User.updateOne({ _id: id }, data).exec();
};

const deleteUserById = async id => {
  return (await User.deleteOne({ _id: id })).deletedCount;
};

module.exports = {
  getAll,
  createNewUser,
  getUserById,
  updateUserById,
  deleteUserById
};
