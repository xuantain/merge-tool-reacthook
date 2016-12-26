'use strict';

var winston = require('winston');

var logLevel = process.env.NODE_ENV === 'development' ? 'debug' : 'error';

var logConfig = {
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

var logger = new winston.Logger({
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

module.exports = logger;
