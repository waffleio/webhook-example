angular.module('app').controller('LiveRepoController', [
  '$scope',
  '$http',
  '$stateParams',
  

  function($scope,$http,$stateParams){
    console.log('stateParams are',$stateParams)
      var sockets = io.connect();
        sockets.on('githubEvent',function(data){
        console.log(data.repository.name);
          if(data.repository.name === $stateParams.repoName){
            $scope.alldata = data;
            $scope.$apply();
          }
        })


  }
]);

