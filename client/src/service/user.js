angular.module('app').service('User', [
  '$http',

  function($http){
    this.projects = function(successCallback){
      $http({
        method: 'GET',
        url : '/api/user'
      }).success(function(user) {
        var user = user;

        $http({
          method: 'GET',
          url: 'http://localhost:3001/api/user/projects',
          params: {access_token: user.accessToken}
        }).success(function(projects) {
          successCallback(projects);
        });
      });
    }
  }
]);
