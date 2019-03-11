const db = require('../_db');

export const createUser = (username, email, password) => {
  const sql =
    'INSERT  INTO posts (username, email, password) VALUES($1, $2, $3)';
  return db.one(sql, [username, email, password]);
};

export const checkIfUserExists = username => {
  const sql = 'SELECT * FROM users WHERE username = $1';
  return db.oneOrNone(sql, [username]);
};
