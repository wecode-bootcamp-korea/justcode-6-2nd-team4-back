require('dotenv').config();
const http = require('http');
const { createApp } = require('./app');

const app = createApp();

const server = http.createServer(app);

server.listen(10010, () => {
  console.log('server start : http://localhost:10010');
});