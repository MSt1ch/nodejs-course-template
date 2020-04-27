const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');
const { logUrl, errorHandler, errorLog, auth, notExistingPagesError } = require('./middlewares/');
const { logger } = require('./helpers');
const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(logUrl);

process
  .on('unhandledRejection', error => {
    logger.log({
      level: 'error',
      message: `Unhandled rejection: ${error.message}`
    });
  })
  .on('uncaughtException', error => {
    logger.log({
      level: 'error',
      message: `Uncaught exception error: ${error.message}`
    });
  });

app.use('/login', loginRouter);
app.use('/users', auth, userRouter);
app.use('/boards', auth, boardRouter);
app.use(
  '/boards/:boardId/tasks',
  auth,
  (req, res, next) => {
    req.boardId = req.params.boardId;
    next();
  },
  taskRouter
);
app.use('*', auth, notExistingPagesError);
app.use(errorLog);
app.use(errorHandler);

// test uncaughtException

// setTimeout(() => {
//   throw new Error('uncaughtException Oops!');
// }, 2000);

// test unhandledRejection

// Promise.reject(Error('Oops!'));

module.exports = app;
