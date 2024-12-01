const app = require('../api');
const { createServer } = require('http');

const server = createServer(app);
module.exports = server;
