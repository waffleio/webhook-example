var express        = require('express');
    http           = require('http'),
    path           = require('path'),
    routes         = require('./routes'),
    passport       = require('passport'),
    GitHubStrategy = require('passport-github').Strategy,
    dotenv         = require('dotenv'),
    request        = require('request'),
    _              = require('lodash')

dotenv.load();


// var githubId= process.env.GITHUB_CLIENT_ID;
var githubId= '3c6370787985c479ef22';
// var githubSecret = process.env.GITHUB_CLIENT_SECRET;
var githubSecret = 'ad836ec5d2a7de7d5ce1b6824d6e534b39fa270f';


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
  },
  function(accessToken, refreshToken, profile, done) {
    profile.accessToken = accessToken;
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));


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

/******ROUTES******/

//home
app.get('/',function(req,res){
  res.render('index');
});

app.get('/repos', function(req,response){
  var url = req.user._json.repos_url;
  var options =
    {
      url: url,
      method: "GET",
      json: true,
      headers: {"User-Agent":"waffle.io-webhooks"},
      qs: {
        access_token: req.user.accessToken
      }
    }
  request(options, function(err,res,body){
    var names = function(array){
    return _.pluck(body, "name");
    }
      response.render('repos', {repos:names(), user:req.user.username})
  });

});
//login
app.get('/login',function(req,res){
  res.render('index',{user: req.user.username, image:req.user.avatar_url});
});

//github redirect
app.get('/auth/github', passport.authenticate('github'));

//if fail go back to login, else go to home page
app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/login');
  });

//******CREATE SERVER******
http.createServer(app).listen(app.get('port'), function(){
  console.log("listening on port "+ app.get('port'));
});


