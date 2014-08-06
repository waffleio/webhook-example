var passport = require('passport'),
    WaffleStrategy  = require('passport-waffle.io').Strategy;

module.exports = {
  init: function(app) {
    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
      done(null, obj);
    });

    passport.use(new WaffleStrategy({
        baseURL: 'https://waffle.io',
        clientID: process.env.WAFFLE_CLIENT_ID,
        clientSecret: process.env.WAFFLE_CLIENT_SECRET,
        callbackURL: "http://localhost:" + app.get('port') + "/auth/waffle/callback",
        userAgent: 'waffle.io-webhooks-demo'
      }, function(accessToken, refreshToken, profile, done) {
        profile.accessToken = accessToken;
        process.nextTick(function () {
          return done(null, profile);
        });
      }
    ));

    return passport;
  }
};
