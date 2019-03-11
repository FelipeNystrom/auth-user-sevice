const pg = require('pg-promise')();

exports.modules = pg(process.env.DB_URL);
