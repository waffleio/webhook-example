angular.module('app').controller('EventsController', [
  '$scope',
  '$http',
  '$stateParams',
  'User',

  function($scope, $http, $stateParams, User) {
    $scope.events = [];
    $scope.repoName = $stateParams.repo;
    User.projects(function(projects) {
      $scope.projects = projects;
    });

    $http({
      method: 'GET',
      url : '/api/user'
    }).success(function(user) {
      $scope.user = user;
    });

    var sockets = io.connect();
    sockets.on('waffleEvent', function(event) {
      console.log(event);
      $scope.events.push(event);
      $scope.$apply();
    });

    $scope.createWebHook = function(id){
    $http({
      method: 'POST',
      url:  "http://localhost:3001/api/projects/" + id + "/hooks",
      params: {access_token: $scope.user.accessToken},
      data:{
        url:"http://522ed480.ngrok.com/webhookData"
      }
    });
    console.log("webhook created");
  }


  }
]);
