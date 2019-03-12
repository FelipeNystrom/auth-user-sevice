const Router = require('express-promise-router');
const jwt = require('jsonwebtoken');
const router = new Router();
const jwtSecret = require('../_auth-service/jwtConfig').secret;
const {} = require('../_queries');

module.exports = router;

router.post('/login', async (req, res) => {
  const { user } = req;

  const token = jwt.sign({ id: user.username }, jwtSecret);

  res.send({
    auth: true,
    token
  });
});
