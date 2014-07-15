angular.module('app').controller('HomePageController', [
  '$scope',
  '$http',



  function($scope,$http){

    $http({
      method: 'GET',
      url : '/user',
    })
    .then(function(response){
      var user = response.data;
      $http({
        method: 'GET',
        url: 'https://api.github.com/users/'+ user.username +'/repos',
        qs: {access_token: user.accessToken}
          }).success(function(data, status){
            $scope.repos = data;
          })
    })
  }

]);