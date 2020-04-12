const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
  if (err) {
    if (err.statusCode) {
      res.status(err.statusCode).send(err.message);
    } else {
      res
        .status(INTERNAL_SERVER_ERROR)
        .send(getStatusText(INTERNAL_SERVER_ERROR));
    }
  }
  return next();
};

module.exports = errorHandler;
