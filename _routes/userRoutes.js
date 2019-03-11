const Router = require('express-promise-router');
const bcrypt = require('bcryptjs');
const router = new Router();
const {
  createUser,
  checkIfUserExists,
  updateUserInfo,
  deleteUser
} = require('../_queries');

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
      return res.status(500).send({
        Error: `Something went wrong, message from server: ${error}`
      });
    }
  }

  res
    .status(412)
    .send({ message: `A user with username ${username} already exists!` });
});

router.put('/update', async (req, res) => {
  if (
    !req.body.username ||
    !req.body.email ||
    !req.body.password ||
    !req.body.oldUsername
  ) {
    return res.status(400).send({
      Error:
        'Could not find username, email, oldUsername or password in request body'
    });
  }

  const {
    body: { username, email, password, oldUsername }
  } = req;

  const saltRounds = 12;

  const encryptedPasswordHash = await bcrypt.hash(password, saltRounds);

  try {
    const updatedUser = await updateUserInfo(
      username,
      email,
      encryptedPasswordHash,
      oldUsername
    );

    if (!updatedUser) {
      return res
        .status(400)
        .send({ error: `User: ${oldUsername} could not be updated` });
    }

    res.send({ message: `User ${username} has been updated!` });

    debugger;
  } catch (error) {
    res
      .status(500)
      .send({ Error: `Something went wrong, message from server: ${error}` });
  }
});

router.delete('/delete', async (req, res) => {
  if (!req.body.username) {
    return res
      .status(400)
      .send({ error: 'Could not find username in request body' });
  }

  const {
    body: { username }
  } = req;

  try {
    const deletedUser = await deleteUser(username);

    if (!deletedUser) {
      return res
        .status(400)
        .send({ error: `User: ${username} could not be deleted` });
    }

    res.send({ message: `User: ${username} is succefully deleted!` });
  } catch (error) {
    res
      .status(500)
      .send({ Error: `Something went wrong, message from server` });
  }
});
