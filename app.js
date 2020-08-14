const express = require('express');
const logger = require('morgan');
const config = require('./config/env');

const connect = require('camo').connect;

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database connection
let database;
connect(config.dbUri, {}).then(async (db) => {
  await require('./utils/helpers/initDb.helper').initAdmin();
  database = db;
});

//app.use('/', indexRouter);
app.use('/api', indexRouter);

// error handler
app.use((err, req, res, next) => {
  // render the error page
  res.status(err.status || 500);
  res.json({
    status: err.status,
    message: err.message
  });
});

// server run
app.listen(config.port, '0.0.0.0', () => {
  console.log(`Server listens http://0.0.0.0:${config.port}`);
});

module.exports = app;