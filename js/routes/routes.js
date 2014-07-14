app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $stateProvider){
 
$locationProvider.html5Mode(true)

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home.html'
    })
    .state('login',{
      url:'/login',
      templateURL:'login.html'
    })




});