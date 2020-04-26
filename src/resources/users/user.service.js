const bcrypt = require('bcrypt');
const createError = require('http-errors');
const usersRepo = require('./user.db.repository');
const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const createNewUser = userData => usersRepo.createNewUser(userData);

const getUserById = id => usersRepo.getUserById(id);

const updateUserById = (id, data) => usersRepo.updateUserById(id, data);

const deleteUserById = async id => {
  await taskService.clearRemovedUserFromTasks(id);
  return usersRepo.deleteUserById(id);
};

const findByLogin = async (login, password) => {
  const user = await usersRepo.findByLogin(login);
  console.log('useruseruseruser', user);
  if (!user) {
    throw new createError.Forbidden(`User with ${login} doesn't exist`);
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    throw new createError.Unauthorized(`User with ${login} doesn't authorized`);
  }
  return user;
};

module.exports = {
  getAll,
  createNewUser,
  getUserById,
  updateUserById,
  deleteUserById,
  findByLogin
};
