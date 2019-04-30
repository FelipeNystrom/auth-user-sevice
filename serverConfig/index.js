const express = require('express');
const sanitize = require('sanitize');
const passport = require('passport');
const HighLevelProducer = kafka.HighLevelProducer;
const Client = kafka.KafkaClient;
const client = new Client({ kafkaHost: 'kafka:9092' });
const producer = new HighLevelProducer(client);

producer.on('error', err => {
  console.log('kafka producer has an error: ');
  console.error(err);
});

producer.on('ready', () => {
  console.log('kafka producer is ready');
});
debugger;
consumer.on('message', (err, data) => {
  debugger;
  if (err) {
    debugger;
    console.error(err);
  }
  console.log(data);
  debugger;
});

const kafkaInit = (req, res, next) => {
  req.producer = producer;
  req.client = client;
  next();
  debugger;
};

module.exports = server => {
  server.use(sanitize.middleware);
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(passport.initialize());
  server.use(kafkaInit);
};
