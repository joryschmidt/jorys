angular.module('opem')

.controller('loginCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
  
  $scope.submit = function() {
    $http.post('/opem/login', $scope.user).then(function(response) {
      $location.path('/opem/#!/dashboard');
    }, function(response) {
      if (response.statusText == "Unauthorized") {
        console.log('Wrong password');
      }
    });
  }
  
  $http.get('/opem/user').then(function() {
    
  }, function() {
    window.location.href = '/opem/login';
  });
}])

.controller('signupCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
  
  $scope.user = {};
  
  $scope.submit = function() {
    $http.post('/opem/signup', $scope.user).then(function(response) {
      $location.path('/opem/login');
    }, function(response) {
      console.log(response);
    });
  }
}]);