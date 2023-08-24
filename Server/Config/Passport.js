const pkg = require("passport-jwt");
const User = require("../Models/User.js");

const JwtStrategy = pkg.Strategy;
const ExtractJwt = pkg.ExtractJwt;

let opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "some secrets.";

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.findById(jwt_payload._id, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or create a new account
        }
      });
    })
  );
};
