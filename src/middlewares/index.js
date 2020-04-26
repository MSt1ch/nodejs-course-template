const logUrl = require('./logUrl');
const catchErrors = require('./catchErrors');
const errorHandler = require('./errorHandler');
const errorLog = require('./errorLog');
const auth = require('./auth');
const notExistingPagesError = require('./notExistingPagesError');

module.exports = {
  logUrl,
  catchErrors,
  errorHandler,
  errorLog,
  auth,
  notExistingPagesError
};
