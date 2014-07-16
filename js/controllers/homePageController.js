angular.module('app').controller('HomePageController', [
  '$scope',
  '$http',



  function($scope,$http){
    var user;

    fetchUserData = function(){
      $http({
        method: 'GET',
        url : '/api/user',
      })
      .then(function(response){
        user = response.data;
        
        $http({
          method: 'GET',
          url: 'https://api.github.com/users/'+ user.username +'/repos',
          params: {access_token: user.accessToken}
        }).success(function(data, status){
          $scope.repos = data;
        })
      })
    }

    fetchUserData();

    $scope.createWebHook = function(repoUrl){
      $http({
        method: 'POST',
        url:  repoUrl + "/hooks",
        params: {access_token: user.accessToken},
        json: true,
        data:{
          "active": true,
          "name": "web",
          "events": [
              "*"
          ],
          "config":{
            "url": "http://18be6b19.ngrok.com/webhookData",
            "content_type": "json",
            "secret": "webhooks"
          }
        }
      }).success(function(data,status){
          console.log
      })
    }


  }


]);