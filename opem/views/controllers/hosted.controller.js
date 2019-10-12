angular.module('opem')

.controller('hostedCtrl', ['$http', '$scope', 'eventCardService', function($http, $scope, eventCardService) {
  
  $http.get('/opem/user').then(function(q) {
    $scope.user = q.data
    
    $http.get('/opem/event/hosted/' + $scope.user._id).then(function(q) {
      
      $scope.events = eventCardService.format(q.data);
    });
  });
  
  
  $scope.logout = function() {
    $http.get('/opem/logout').then(function(response) {
      delete $scope.user;
      window.location.href = '/opem/login';
      console.log('logged out');
    }, function() {
      console.log("couldn't log out");
    });
  };
}]);