angular.module('app').config([
  '$stateProvider', 
  '$urlRouterProvider', 
  '$locationProvider', 
  '$stateProvider', 
  
  function($stateProvider, $urlRouterProvider, $locationProvider, $stateProvider) {
 
    $locationProvider.html5Mode(true).hashPrefix('!');

    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: '/login.html'
      })
      .state('repos', {
        url: '/repos',
        controller: 'HomePageController as controller',
        templateUrl: '/repos.html'

      })
      .state('liveRepo', {
        url: '/:owner/:repo',
        controller: 'LiveRepoController as controller',
        templateUrl: '/liveRepo.html'
      })

}]);