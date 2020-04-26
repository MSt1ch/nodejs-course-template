const createError = require('http-errors');

const notExistingPagesError = (req, res, next) => {
  return next(new createError.NotFound('Not found'));
};

module.exports = notExistingPagesError;
