const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const routes = require('./routes/index');

const createApp = () => {
    
    const app = express();
    app.use(cors(), express.json(), logger('combined'), routes);
    app.use(express.static('public'));

  return app;
};

module.exports = { createApp };