angular.module('app').controller('EventsController', [
  '$scope',
  '$http',
  '$stateParams',

  function($scope, $http, $stateParams) {
    $scope.events = [];
    $scope.repoName = $stateParams.repo;

    var sockets = io.connect();
    sockets.on('githubEvent:' + $stateParams.owner + '/' + $stateParams.repo, function(event) {
      $scope.events.push(event);
      $scope.$apply();
    });
  }
]);
