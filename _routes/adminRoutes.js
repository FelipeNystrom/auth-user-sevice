const Router = require('express-promise-router');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const router = new Router();
const {} = require('../_queries');

const filePath = path.join(__dirname, '../keys/signing.pem');

const privateEKey = fs.readFileSync(filePath);

module.exports = router;

router.post('/login', async (req, res) => {
  const {
    user: { username }
  } = req;
  const token = jwt.sign({ sub: username }, privateEKey, {
    expiresIn: '1h',
    algorithm: 'RS256'
  });

  res.send({
    auth: true,
    token
  });
});
