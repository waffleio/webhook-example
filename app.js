var express        = require('express');
    http           = require('http'),
    path           = require('path'),
    routes         = require('./routes'),
    passport       = require('passport'),
    GitHubStrategy = require('passport-github').Strategy,
    request        = require('request'),
    _              = require('lodash')

var githubId= process.env.GITHUB_CLIENT_ID;
var githubSecret = process.env.GITHUB_CLIENT_SECRET;

var app = express();
app.set('port', process.env.PORT || 9001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/client/partials'));
app.use(express.cookieParser());
app.use(express.bodyParser()); //middleware parser
app.use(express.methodOverride()); //allows for PUT/DELETE ect
app.use(express.session({ secret: 'supers3cret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: githubId,
    clientSecret: githubSecret,
    callbackURL: "http://localhost:9001/auth/github/callback"
  }, function(accessToken, refreshToken, profile, done) {
    profile.accessToken = accessToken;
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

/******ROUTES******/
routes(app);

//******CREATE SERVER******
http.createServer(app).listen(app.get('port'), function(){
  console.log("listening on port "+ app.get('port'));
});


