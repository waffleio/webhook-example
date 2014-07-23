// angular.module('app').service('UserData', [
//   '$scope',
//   '$http',

//   function($scope, $http){

//     fetchUserData = function(){
//       $http({
//         method: 'GET',
//         url : '/api/user',
//       })
//       .then(function(response){
//         var user = response.data;
        
//         $http({
//           method: 'GET',
//           url: 'https://api.github.com/users/'+ user.username +'/repos',
//           params: {access_token: user.accessToken}
//         }).success(function(data, status){
//           $scope.repos = data;
//         })
//       })
//     }

//     fetchUserData();


//   }


// ]);