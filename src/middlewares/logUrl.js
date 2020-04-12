const logger = require('../helpers/logger');

const logUrl = (req, res, next) => {
  logger.log({
    level: 'info',
    message: JSON.stringify({ url: req.url, query: req.query, body: req.body })
  });
  next();
};

module.exports = logUrl;
