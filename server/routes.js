var passport = require('passport');

module.exports = function(app, io) {

  /*
   * Webhook Receiver
   */
  app.post('/webhookData', function(req,res){
    console.log(req.headers);
    // if (!req.body.repository) {
    //   console.log('No repository on event:', req.body);
    //   return;
    // }

    io.emit('waffleEvent', {
      type: req.headers['x-waffle-event'],
      data: req.body
    });

    res.status(200).end()
  })

  /*
   * Auth Routes
   */
  app.get('/auth/waffle', passport.authenticate('waffle', {scope: '*'}));
  app.get('/auth/waffle/callback',
    passport.authenticate('waffle', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/projects');
    });

  /*
   * API Routes
   */
  app.get('/api/user', function(req, res){
    if(req.isAuthenticated()){
      res.json(req.user);
    } else {
      res.send(401);
    }
  });

  /*
   * App Routes
   */
  var renderApp = function(req, res) {
    if(!req.isAuthenticated()){
      return res.redirect('/');
    }
    res.render('index');
  }

  app.get('/', function(req, res) {
    res.render('index');
  });
  app.get('/projects', renderApp);
  app.get('/:repo', renderApp);
}
