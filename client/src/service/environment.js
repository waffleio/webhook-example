angular.module('app').service('EnvironmentService', [
  '$http',
  '$q',

  function($http, $q){

    this.getEnvironment = function(){
      deferred = $q.defer();

      $http({
        method: 'GET',
        url: '/environment'
      }).then(function(environment){
        deferred.resolve(environment.data);
      });

      return deferred.promise;

    }
  }
])
