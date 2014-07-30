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
      .state('projects', {
        url: '/projects',
        controller: 'ProjectsController as controller',
        templateUrl: '/projects.html'

      })
      .state('events', {
        url: '/:owner/:repo',
        controller: 'EventsController as controller',
        templateUrl: '/events.html'
      })

}]);
