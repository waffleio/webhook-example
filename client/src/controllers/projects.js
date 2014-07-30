angular.module('app').controller('ProjectsController', [
  '$scope',
  '$http',

  function($scope,$http){
    $http({
      method: 'GET',
      url : '/api/user'
    }).success(function(user) {
      console.log(user);
      $scope.user = user;

      $http({
        method: 'GET',
        url: 'http://localhost:3001/api/user/projects',
        params: {access_token: $scope.user.accessToken}
      }).success(function(projects) {
        console.log('projects are:', projects)
        $scope.projects = projects;
      });
    });

    $scope.createWebHook = function(id){
      //TODO: get request to check if hook exists
      $http({
        method: 'POST',
        url:  "http://localhost:3001/api/projects/" + id + "/hooks",
        params: {access_token: $scope.user.accessToken},
        data:{
          url:"http://522ed480.ngrok.com/webhookData"
        }
      });
    }
  }
]);
