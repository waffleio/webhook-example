angular.module('app').controller('LiveRepoController', [
  '$scope',
  '$http',
  '$stateParams',
  

  function($scope,$http,$stateParams){

    $scope.events = [];
    $scope.repoName = $stateParams.repoName;
      var sockets = io.connect();
        sockets.on('githubEvent',function(data){
          if(data.repository.name === $stateParams.repoName){
            $scope.events.push(data);
            $scope.$apply();
          }
        })

  }
]);
