const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const fs = require('fs');
const path = require('path');
const { getUserWithUsername } = require('../_queries');

const filePath = path.join(__dirname, '../keys/public.pem');

const publicEKey = fs.readFileSync(filePath);
const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: publicEKey
};

module.exports = new JWTStrategy(options, async (jwt_payload, done) => {
  try {
    const verified = await getUserWithUsername(jwt_payload.sub);

    if (verified) {
      done(null, verified);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error);
  }
});
