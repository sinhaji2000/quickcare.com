// config/passport-jwt.js
const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const User = require("../model/user");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || "secret",
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    // console.log("JWT payload:", jwt_payload); // Add this line for debugging
    try {
      const user = await User.findById(jwt_payload._id);
      if (user) return done(null, user);
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

module.exports = passport;
