// config/passport-jwt.js
const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const User = require("../model/user");
const Doc = require("../model/doc");
const BlacklistedToken = require("../model/blackListToken");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || "secret",
  passReqToCallback: true,
};

passport.use(
  "user-jwt",
  new JwtStrategy(opts, async (req, jwt_payload, done) => {
    // console.log("JWT payload:", jwt_payload); // Add this line for debugging
    try {
      const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      const blacklisted = await BlacklistedToken.findOne({ token });

      if (blacklisted) return done(null, false); // Token is blacklisted

      const user = await User.findById(jwt_payload._id);
      if (user) return done(null, user);
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

passport.use(
  "doc-jwt",
  new JwtStrategy(opts, async (req, jwt_payload, done) => {
    // console.log("JWT payload:", jwt_payload); // Add this line for debugging
    try {
      const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      const blacklisted = await BlacklistedToken.findOne({ token });

      if (blacklisted) return done(null, false); // Token is blacklisted

      const doc = await Doc.findById(jwt_payload._id);
      if (doc) return done(null, doc);
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);


module.exports = passport;
