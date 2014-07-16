angular.module('app').controller('LiveRepoController', [

  '$scope',
  

  function($scope){
      var sockets = io.connect();
        sockets.on('githubEvent',function(data){
        console.log(data);
        $scope.alldata = data;
        $scope.$apply();
        })
  }
]);

