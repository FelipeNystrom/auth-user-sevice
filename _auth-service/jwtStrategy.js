const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const jwtSecret = require('./jwtConfig').secret;
const { getUserWithUsername } = require('../_queries');

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
};

module.exports = new JWTStrategy(options, async (jwt_payload, done) => {
  try {
    const verified = await getUserWithUsername(jwt_payload.id);

    if (verified) {
      done(null, verified);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error);
  }
});
