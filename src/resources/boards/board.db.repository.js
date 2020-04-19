const Board = require('./board.model');
const createError = require('http-errors');

const getAll = async () => {
  return await Board.find({});
};

const createNewBoard = async board => {
  return await Board.create({ ...board });
};

const getBoardById = async id => {
  const board = await Board.findOne({ _id: id }).exec();
  if (!board) {
    throw new createError(404, `Board ${id} not found`);
  }
  return board;
};

const updateBoardById = async (id, data) => {
  return await Board.updateOne({ _id: id }, data).exec();
};

const deleteBoardById = async id => {
  return (await Board.deleteOne({ _id: id })).deletedCount;
};

module.exports = {
  getAll,
  createNewBoard,
  getBoardById,
  updateBoardById,
  deleteBoardById
};
