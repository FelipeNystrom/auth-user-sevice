const Router = require('express-promise-router');
const jwt = require('jsonwebtoken');
const router = new Router();
const jwtSecret = require('../_auth-service/jwtConfig').secret;
const {} = require('../_queries');

module.exports = router;

router.post('/login', async (req, res) => {
  const {
    user: { username }
  } = req;

  const token = jwt.sign({ sub: username }, jwtSecret, { expiresIn: '1h' });

  res.send({
    auth: true,
    token
  });
});
