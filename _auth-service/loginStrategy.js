const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { getUserWithUsername } = require('../_queries');

module.exports = new LocalStrategy(
  { session: false },
  async (username, password, done) => {
    try {
      const user = await getUserWithUsername(username);

      if (!user) {
        return done(null, false, { message: 'Wrong username.' });
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }

      return done(null, user, { message: 'Logged In Successfully' });
    } catch (error) {
      return done(error);
    }
  }
);
