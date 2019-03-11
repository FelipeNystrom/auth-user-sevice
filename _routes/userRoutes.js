const Router = require('express-promise-router');
const router = new Router();
const { createUser, checkIfUserExists } = require('../_queries');

module.exports = router;

router.post('/create', async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).send({
      error: 'Could not find username, email or password in request body'
    });
  }

  const {
    body: { username, email, password }
  } = req;

  const userExists = await checkIfUserExists(username);

  if (!userExists) {
    try {
      const createdUser = await createUser(username, email, password);

      debugger;

      res.send({ message: 'user is created!' });
    } catch (error) {
      return res
        .status(500)
        .send({ Error: `Something went wrong, from server: ${error}` });
    }
  }

  res
    .status(412)
    .send({ message: `A user with username ${username} already exists!` });
});
