require('dotenv').config({ path: __dirname + '/.env' });
const server = require('express')();
const passport = require('passport');
const passportConfig = require('./_auth-service');
const serverConfig = require('./serverConfig');
const mountRoutes = require('./_routes');
const kafkaStandaloneConsumerSetup = require('./_consumers');
const _port = process.env.PORT || 5001;

const topic = { topic: 'author' };

serverConfig(server);
kafkaStandaloneConsumerSetup(topic);
debugger;
passportConfig(passport);
mountRoutes(server);

server.listen(_port, () => {
  console.log(`User auth service is up on ${_port}`);
});
