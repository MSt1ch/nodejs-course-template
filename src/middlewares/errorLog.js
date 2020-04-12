const { logger } = require('../helpers/');

const errorLog = (err, req, res, next) => {
  if (err) {
    logger.log({ level: 'error', message: err.message });
  }
  return next();
};

module.exports = errorLog;
