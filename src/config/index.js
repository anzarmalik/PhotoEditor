require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const pino = require('pino');

const pinoPath = pino('./logs/info.log');
const expressPino = require('express-pino-logger')({
  logger: pinoPath,
});
// const database = require('./db');
// database.connect();
const indexRouter = require('../routes/index');
const usersRouter = require('../routes/resize');

const app = express();
const { logger, expressLogger, multiStreamLog } = require('./logger');

app.use(expressLogger);

app.use(expressPino);

multiStreamLog.info();

process.on('warning', (warning) => {
  multiStreamLog.warn(warning);
});

process.on('uncaughtException', pino.final(logger, (err, finalLogger) => {
  multiStreamLog.error(err);
  finalLogger.error(err, 'uncaughtException');
  process.exit(1);
}));

process.on('unhandledRejection', pino.final(logger, (err, finalLogger) => {
  // console.log(err);
  multiStreamLog.error(err);
  finalLogger.error(err, 'unhandledRejection');
  process.exit(1);
}));

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
  limit: '50mb',
}));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, '../../views'));
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, '../../public')));
app.use('/images', express.static(path.join(__dirname, '../../images')));

app.use(session({
  secret: 'secretSession',
  saveUninitialized: false,
  resave: false,
}));

app.use('/', indexRouter);
app.use('/users/v1', usersRouter);

module.exports = { app, logger };
