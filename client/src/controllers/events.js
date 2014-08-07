angular.module('app').controller('EventsController', [
  '$scope',
  '$http',
  '$stateParams',
  'User',
  'EnvironmentService',

  function($scope, $http, $stateParams, User, EnvironmentService) {
    $scope.events = [];
    User.projects(function(projects) {
      $scope.project = _.find(projects, function(project){return project._id === $stateParams.id});
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

      EnvironmentService.getEnvironment().then(function(environment){
        $http({
          method: 'POST',
          url:  "https://waffle.io/api/projects/" + id + "/hooks",
          params: {access_token: $scope.user.accessToken},
          data:{
            url: environment.callbackBaseUrl + '/webhookData'
          }
        });
        console.log("webhook created");

      })


  }


  }
]);
