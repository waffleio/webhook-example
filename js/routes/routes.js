angular.module('app').config([
  '$stateProvider', 
  '$urlRouterProvider', 
  '$locationProvider', 
  '$stateProvider', 
  function($stateProvider, $urlRouterProvider, $locationProvider, $stateProvider){
 
    $locationProvider.html5Mode(true).hashPrefix('!');

    // $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'login.html'
      })
      .state('home', {
        url: '/app',
        controller: 'HomePageController as controller',
        templateUrl: 'home.html'
      })
      .state('repos', {
        url: '/repos',
        controller: 'HomePageController as controller',
        templateUrl: 'repos.html'

      })
      .state('liveRepo', {
        url: '/liveRepo',
        controller: 'LiveRepoController as controller',
        templateUrl: 'liveRepo.html'
      })

}]);