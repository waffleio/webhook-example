module.exports = function(app, io){

  var renderApp = function(req, res) {
    console.log('renderApp');
    if(!req.isAuthenticated()){
      console.log('redirecting');
      return res.redirect('/');
    }
    res.render('index');
  }

  app.get('/', function(req, res) {
    res.render('index');
  });
  
  app.get('/repos', renderApp);

  app.get('/api/user', function(req, res){
    if(req.isAuthenticated()){
      res.json(req.user);
    } else {
      res.send(401);
    }
  });

  //github redirect
  app.get('/auth/github', passport.authenticate('github', { scope: 'write:repo_hook, public_repo' }));

  //if fail go back to login, else go to home page
  app.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/repos');
    });

  app.post('/webhookData', function(req,res){
    io.emit('githubEvent:' + req.body.repository.full_name, {
      event: req.headers['x-GitHub-event'],
      data: req.body
    });
    console.log('githubEvent:' + req.body.repository.full_name);
    res.send(200);
  })

  app.get('/:owner/:repo', renderApp);
}