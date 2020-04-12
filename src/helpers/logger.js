const { createLogger, transports, format } = require('winston');
const path = require('path');

const errorLog = path.join(__dirname, '../../logs/error.log');
const infoLog = path.join(__dirname, '../../logs/info.log');

const logger = createLogger({
  level: 'silly',

  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.cli())
    }),
    new transports.File({
      filename: errorLog,
      level: 'error',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.uncolorize(),
        format.prettyPrint()
      )
    }),
    new transports.File({
      filename: infoLog,
      level: 'info',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.uncolorize(),
        format.prettyPrint()
      )
    })
  ]
});

module.exports = logger;
