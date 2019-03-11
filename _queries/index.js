const db = require('../_db');

module.exports = {
  createUser: (username, email, password) => {
    const sql =
      'INSERT  INTO users (username, email, password) VALUES($1, $2, $3) RETURNING *';
    return db.one(sql, [username, email, password]);
  },
  checkIfUserExists: username => {
    const sql = 'SELECT * FROM users WHERE username = $1';
    return db.oneOrNone(sql, [username]);
  }
};
