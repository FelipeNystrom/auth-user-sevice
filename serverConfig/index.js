const express = require('express');
const sanitize = require('sanitize');
const passport = require('passport');

module.exports = server => {
  server.use(sanitize.middleware);
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(passport.initialize());
};
