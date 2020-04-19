const boardsRepo = require('./board.db.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const createNewBoard = board => boardsRepo.createNewBoard(board);

const getBoardById = async id => await boardsRepo.getBoardById(id);

const updateBoardById = async (id, data) =>
  await boardsRepo.updateBoardById(id, data);

const deleteBoardById = async id => {
  await tasksService.deleteTasksByBoardId(id);
  return boardsRepo.deleteBoardById(id);
};

module.exports = {
  getAll,
  createNewBoard,
  getBoardById,
  updateBoardById,
  deleteBoardById
};
