const Task = require('./task.model');
const createError = require('http-errors');

const getTasksByBoardId = async boardId => {
  return await Task.find({ boardId });
};

const createNewTask = async (boardId, task) => {
  return await Task.create({ ...task, boardId });
};

const getTaskById = async id => {
  const task = await Task.findOne({ _id: id }).exec();
  if (!task) {
    throw new createError(404, `Task ${id} not found`);
  }
  return task;
};

const updateTaskById = async (id, data) => {
  return await Task.updateOne({ _id: id }, { ...data, id });
};

const deleteTask = async taskId => {
  return (await Task.deleteOne({ _id: taskId })).deletedCount;
};

const clearRemovedUserFromTasks = async userId => {
  return await Task.updateMany({ userId }, { userId: null });
};

const deleteTasksByBoardId = async boardId => {
  return await Task.deleteMany({ boardId });
};

module.exports = {
  getTasksByBoardId,
  createNewTask,
  getTaskById,
  updateTaskById,
  deleteTask,
  clearRemovedUserFromTasks,
  deleteTasksByBoardId
};
