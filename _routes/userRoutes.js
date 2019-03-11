const Router = require('express-promise-router');
const bcrypt = require('bcryptjs');
const router = new Router();
const { createUser, checkIfUserExists } = require('../_queries');

module.exports = router;

router.post('/create', async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).send({
      Error: 'Could not find username, email or password in request body'
    });
  }

  const {
    body: { username, email, password }
  } = req;

  const saltRounds = 12;
  const userExists = await checkIfUserExists(username);

  if (!userExists) {
    const encryptedPasswordHash = await bcrypt.hash(password, saltRounds);

    try {
      await createUser(username, email, encryptedPasswordHash);

      res.send({
        message: `User ${username} is created succefully!`
      });
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
