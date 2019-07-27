'use strict';

const winston = require('winston');

const logLevel = process.env.NODE_ENV === 'development' ? 'debug' : 'error';

const logConfig = {
  levels: {
    debug: 0,
    info: 1,
    trace: 2,
    warn: 3,
    error: 4
  },
  colors: {
    debug: 'blue',
    info: 'green',
    trace: 'yellow',
    warn: 'cyan',
    error: 'red'
  }
};

winston.addColors(logConfig.colors);

const logger = new winston.Logger({
  levels: logConfig.levels,
  transports: [
    new winston.transports.Console({
      json: false,
      timestamp: true,
      colorize: true,
      level: logLevel
    })
  ],
  exceptionHandlers: [
    new winston.transports.Console({
      json: false,
      timestamp: true,
      colorize: true,
      level: logLevel
    })
  ],
  exitOnError: false
});

export default logger;
