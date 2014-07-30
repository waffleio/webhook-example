angular.module('app').controller('ProjectsController', [
  '$scope',
  '$http',
  'User',

  function($scope,$http, User){

   User.projects(function(projects) {
      $scope.projects = projects;
    });
  }
]);
