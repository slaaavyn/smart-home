const express = require('express');
const logger = require('morgan');
const config = require('./config/env');

const camo = require('camo');

const indexRouter = require('./routes/index');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api', indexRouter);

// database connection
camo.connect(config.dbUri, {}).then(async (db) => {
    await require('./utils/helpers/initDb.helper').initAdmin();
});

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

    // run MQTT broker
    if(process.env.NODE_ENV !== 'test') {
        require('./config/mosca.config');
    }
});

module.exports = app;