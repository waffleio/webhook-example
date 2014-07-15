
module.exports = function(app){

  app.get('/', function(req, res){
    res.render('index');
  });

  app.get('/app', function(req, res){
    if(req.isAuthenticated()){
      res.render('index');
    } else {
      res.redirect('/');
    }
  });

  app.get('/user', function(req, res){
    if(req.isAuthenticated()){
      res.json(req.user);
    } else {
      res.send(401);
    }
  });

  app.get('/repos', function(req,response){
    if(req.isAuthenticated()){
      res.json(req.user);
    } else {
      res.send(401);
    }
  });

  //github redirect
  app.get('/auth/github', passport.authenticate('github'));

  //if fail go back to login, else go to home page
  app.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/app');
    });


}