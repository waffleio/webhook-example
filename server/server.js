var express         = require('express');
    http            = require('http'),
    routes          = require('./routes'),
    bodyParser      = require('body-parser'),
    fs              = require('fs');

fs.realpath(__dirname + '/../', function (err, projectRoot) {
  console.log('project root:', projectRoot);

  var app = express(),
      passport;

  app.set('port', process.env.PORT || 9001);
  app.set('views', projectRoot + '/server/views');
  app.set('view engine', 'jade');

  passport = require('./passport').init(app);

  app.use(require('serve-static')(projectRoot + '/client/vendor'));
  app.use(require('serve-static')(projectRoot + '/client/src'));
  app.use(require('serve-static')(projectRoot + '/client/partials'));
  app.use(require('serve-static')(projectRoot + '/client/styles'));
  app.use(require('cookie-parser')());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(require('cookie-session')({ secret: 'supers3cret' }));
  app.use(passport.initialize());
  app.use(passport.session());

  //******CREATE SERVER******
  var server = http.createServer(app);

  var io = require('socket.io').listen(server);

  routes(app, io);

  server.listen(app.get('port'), function(){
    console.log("listening on port "+ app.get('port'));
  });
});
