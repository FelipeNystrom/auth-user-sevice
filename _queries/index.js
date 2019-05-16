const db = require('../_db');

module.exports = {
  getUserWithUsername: username => {
    const sql = 'SELECT * FROM auth_service.users WHERE username = $1;';
    return db.oneOrNone(sql, [username]);
  },
  createUser: (username, email, password) => {
    const sql =
      'INSERT INTO auth_service.users (username, email, password) VALUES($1, $2, $3) RETURNING *';
    return db.one(sql, [username, email, password]);
  },
  checkIfUserExists: username => {
    const sql = 'SELECT * FROM auth_service.users WHERE username = $1';
    return db.oneOrNone(sql, [username]);
  },
  updateUserInfo: (newUsername, newEmail, newPassword, oldUsername) => {
    const sql =
      'UPDATE auth_service.users SET username = $1, email = $2, password = $3 WHERE username = $4 RETURNING *';
    return db.oneOrNone(sql, [newUsername, newEmail, newPassword, oldUsername]);
  },
  deleteUser: username => {
    const sql =
      'DELETE FROM auth_service.users WHERE username = $1 RETURNING *';
    return db.oneOrNone(sql, [username]);
  }
};
