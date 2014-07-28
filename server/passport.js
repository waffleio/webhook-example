var passport = require('passport'),
    GitHubStrategy  = require('passport-github').Strategy;

module.exports = {
  init: function(app) {
    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
      done(null, obj);
    });

    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:" + app.get('port') + "/auth/github/callback"
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
