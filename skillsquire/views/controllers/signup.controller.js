angular.module('ssq')

.controller('signupCtrl', ['$http', '$scope', '$location', function($http, $scope, $location) {
  $scope.user = {};
  
  $scope.submit = function() {
    if ($scope.user.password == $scope.user.confirmation) {
      $http({method: 'POST', url: '/skillsquire/register', data: $scope.user }).then(function() {
        // $location.path('/skillsquire/#!/login');
        window.location.href = '/skillsquire/#!/login';
      }, function(err) {
        var message = err.data;
        document.getElementById('err_message').innerHTML = `<p>${message}<p>`;
        $('#err_message').addClass('flash-error');
        console.log(err);
      });
    } else {
      alert('Password fields do not match');
    }
  };
}]);