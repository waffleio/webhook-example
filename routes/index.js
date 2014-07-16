
module.exports = function(app){

  app.get('/', function(req, res){
    res.render('index');
  });

  var renderApp = function(req, res){
    if(req.isAuthenticated()){
      res.render('index');
    } else {
      res.redirect('/');
    }
  }

  app.get('/app', renderApp);
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
      res.redirect('/app');
    });


}