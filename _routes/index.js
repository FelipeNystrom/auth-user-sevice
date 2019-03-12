const passport = require('passport');
const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');

module.exports = server => {
  server.use(
    '/user',
    passport.authenticate('jwt', { session: false }),
    userRoutes
  );
  server.use(
    '/admin',
    passport.authenticate('login', { session: false }),
    adminRoutes
  );
};
