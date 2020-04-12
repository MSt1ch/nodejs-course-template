const Board = require('./board.model');
let boards = require('../../mockData/boards');
const createError = require('http-errors');

const getAll = async () => {
  return boards;
};

const createNewBoard = async board => {
  const newBoard = new Board(board);
  boards.push(newBoard);
  return newBoard;
};

const getBoardById = async id => {
  const board = boards.find(boardData => boardData.id === id);
  if (board === undefined) {
    throw new createError(404, `Board ${id} not found`);
  }
  return board;
};

const updateBoardById = async (id, data) => {
  const board = await getBoardById(id);
  const { id: boardId, title, columns } = data;

  if (board) {
    if (boardId) board.id = boardId;
    if (title) board.title = title;
    if (columns) board.columns = columns;
  }
  return board;
};

const deleteBoardById = async id => {
  const board = await getBoardById(id);
  if (board) {
    boards = boards.filter(user => user.id !== id);
  }
  return board;
};

module.exports = {
  getAll,
  createNewBoard,
  getBoardById,
  updateBoardById,
  deleteBoardById
};
