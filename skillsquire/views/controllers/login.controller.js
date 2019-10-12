angular.module('ssq')

.controller('loginCtrl', ['$http', '$scope', '$location', '$rootScope', function($http, $scope, $location, $rootScope) {
  $scope.user = {};
  
  $scope.submit = function() {
    $http({ method: 'POST', url: '/skillsquire/login', data: $scope.user }).then(
    function(query) {
      var user = query.data;
      $rootScope.userLoggedIn = true;
      delete user.password;
      $rootScope.rootUser = user;
      if (user.admin) $rootScope.userIsAdmin = true;
      window.location.href = '/skillsquire/#!/dashboard';
    }, function(response) {
      console.log(response.data.message);
      window.location.reload();
    });
  };
}]);
