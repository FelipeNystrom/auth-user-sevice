const Router = require('express-promise-router');
const jwt = require('jsonwebtoken');
const router = new Router();

const { PRIVATE_KEY } = process.env;

module.exports = router;

router.post('/login', async (req, res) => {
  debugger;
  const {
    body: { username }
  } = req;

  debugger;
  const token = jwt.sign({ sub: username }, PRIVATE_KEY, {
    expiresIn: '1h',
    algorithm: 'RS256'
  });

  res.send({
    auth: true,
    token
  });
});
