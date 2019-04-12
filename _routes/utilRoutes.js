const Router = require('express-promise-router');
const router = new Router();
const { getUserWithUsername } = require('../_queries');

module.exports = router;

router.post('/token/verify', async (req, res) => {
  if (!req.username) {
    return res
      .status(400)
      .send({ error: 'You have to provide a username in request' });
  }
  const { username } = req;
  debugger;
  try {
    const verified = await getUserWithUsername(username);

    if (verified) {
      return res.send({ username: true });
    }

    res.send({ username: false });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});
