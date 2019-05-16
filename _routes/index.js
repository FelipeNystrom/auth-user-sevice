const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');

module.exports = server => {
  server.use('/user', userRoutes);
  server.use('/admin', adminRoutes);
};
