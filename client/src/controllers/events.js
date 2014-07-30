angular.module('app').controller('EventsController', [
  '$scope',
  '$http',
  '$stateParams',

  function($scope, $http, $stateParams) {
    $scope.events = [];
    $scope.repoName = $stateParams.repo;

    var sockets = io.connect();
    sockets.on('waffleEvent', function(event) {
      console.log(event);
      $scope.events.push(event);
      $scope.$apply();
    });
  }
]);
