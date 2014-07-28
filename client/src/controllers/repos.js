angular.module('app').controller('ReposController', [
  '$scope',
  '$http',

  function($scope,$http){
    $http({
      method: 'GET',
      url : '/api/user'
    }).success(function(user) {
      $scope.user = user;

      $http({
        method: 'GET',
        url: 'https://api.github.com/users/'+ $scope.user.username +'/repos',
        params: {access_token: $scope.user.accessToken}
      }).success(function(repos) {
        $scope.repos = repos;
      });
    });

    $scope.createWebHook = function(repoUrl){
      //TODO: get request to check if hook exists
      $http({
        method: 'POST',
        url:  repoUrl + "/hooks",
        params: {access_token: $scope.user.accessToken},
        json: true,
        data:{
          "active": true,
          "name": "web",
          "events": [
            "*"
          ],
          "config":{
            "url": "http://522ed480.ngrok.com/webhookData",
            "content_type": "json",
            "secret": "webhooks"
          }
        }
      });
    }
  }
]);
