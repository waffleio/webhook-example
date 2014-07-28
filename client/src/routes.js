angular.module('app').config([
  '$stateProvider',
  '$locationProvider',

  function($stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true).hashPrefix('!');

    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: '/login.html'
      })
      .state('repos', {
        url: '/repos',
        controller: 'ReposController as controller',
        templateUrl: '/repos.html'

      })
      .state('events', {
        url: '/:owner/:repo',
        controller: 'EventsController as controller',
        templateUrl: '/events.html'
      })

}]);
