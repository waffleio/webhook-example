angular.module('app').controller('LiveRepoController', [
  '$scope',
  '$http',
  '$stateParams',

  function($scope, $http, $stateParams) {
    $scope.events = [];
    $scope.repoName = $stateParams.repo;

    var sockets = io.connect();
    sockets.on('githubEvent:' + $stateParams.owner + '/' + $stateParams.repo, function(event) {
      data = event.data;
      if (data.repository.name === $stateParams.repo) {
        $scope.events.push(data);
        $scope.$apply();
      }
    });
  }
]);
