var passport = require('passport');

module.exports = function(app, io) {

  /*
   * Webhook Receiver
   */
  app.post('/webhookData', function(req,res){
    if (!req.body.repository) {
      console.log('No repository on event:', req.body);
      return;
    }

    io.emit('githubEvent:' + req.body.repository.full_name, {
      type: req.headers['x-GitHub-event'],
      data: req.body
    });

    res.status(200).end()
  })

  /*
   * Auth Routes
   */
  app.get('/auth/github', passport.authenticate('github', { scope: 'write:repo_hook, public_repo' }));
  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/repos');
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
  app.get('/repos', renderApp);
  app.get('/:owner/:repo', renderApp);
}
