const server = require('express')();
const serverConfig = require('./serverConfig');
const mountRoutes = require('./_routes');
const _port = process.env.PORT || 5001;

serverConfig(server);
mountRoutes(server);

server.listen(_port, () => {
  console.log(`User auth service is up on ${_port}`);
});
