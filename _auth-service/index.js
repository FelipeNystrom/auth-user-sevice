const loginStrategy = require('./loginStrategy');
const jwtStrategy = require('./jwtStrategy');

module.exports = passport => {
  passport.use('login', loginStrategy);

  passport.use('jwt', jwtStrategy);
};
