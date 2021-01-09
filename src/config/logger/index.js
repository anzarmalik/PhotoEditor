const pino = require('pino');
const expressPino = require('express-pino-logger');
const fs = require('fs');
const pinoms = require('pino-multi-stream');

const logger = pino({
  prettyPrint: {
    colorize: true, // --colorize
    timestampKey: 'time', // --timestampKey
    translateTime: true, // --translateTime
    ignore: 'pid,hostname', // --ignore,
  },
});

const streams = [
  {
    stream: fs.createWriteStream('./logs/info.stream.log', {
      flags: 'a',
      encoding: null,
    }),
  },
  {
    level: 'debug',
    stream: fs.createWriteStream('./logs/requestResponse.stream.log', {
      flags: 'a',
      encoding: null,
    }),
  },
  {
    level: 'fatal',
    stream: fs.createWriteStream('./logs/fatal.stream.log', {
      flags: 'a',
      encoding: null,
    }),
  },
  {
    level: 'warn',
    stream: fs.createWriteStream('./logs/warn.stream.log', {
      flags: 'a',
      encoding: null,
    }),
  },
  {
    level: 'error',
    stream: fs.createWriteStream('./logs/error.stream.log', {
      flags: 'a',
      encoding: null,
    }),
  },
];
const multiStreamLog = pinoms({ streams });

const expressLogger = expressPino({ logger });

module.exports = { logger, expressLogger, multiStreamLog };
