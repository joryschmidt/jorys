angular.module('ssq')

.controller('dashboardCtrl', ['$http', '$scope', '$route', function($http, $scope, $route) {
  
  $scope.customResource = {};
  
  $scope.showDetails = function(event) {
    var prop = event.target.id;
    $scope[prop] ? $scope[prop] = false : $scope[prop] = true;
  };
  
  $scope.removeCustomRsc = function(id) {
    $http({ method: 'PUT', url: '/skillsquire/user/remove_custom_resource', data: { id: id }}).then(function() {
      $scope.custom_resources.forEach(function(rs, i) {
        if (rs._id == id) $scope.custom_resources.splice(i, 1);
      });
    }, function(response) {
      console.log(response);
    });
  };
  
  $scope.removeRsc = function(id) {
    $http({ method: 'PUT', url: '/skillsquire/user/remove_resource', data: { id: id }}).then(function() {
      $scope.resources.forEach(function(rs, i) {
        if (rs._id == id) $scope.resources.splice(i, 1);
      });
    }, function(response) {
      console.log(response);
    });
  };
  
  $scope.roundRating = function(rating) {
    return Math.round(rating);
  };
  
  $scope.deleteAccount = function() {
    if(confirm("Are you sure you want to do this? It cannot be undone.")) {
      $http({ method: 'DELETE', url: '/skillsquire/user/' + $scope.user._id }).then(function(response) {
        
        $http.get('/skillsquire/logout').then(function() {
          window.location.href = '/';
        });
      });
    }
  };
  
  $scope.submit = function() {
    $http({method: 'POST', url: '/skillsquire/resource/queue', data: $scope.customResource }).then(function(response) {
      
      $scope.custom_resources.unshift(response.data);
      $scope.customResource.name = '';
      $scope.customResource.link = '';
      $scope.customResource.color = '';
      $scope.customResource.description = '';
      
    }, function() {
      console.log("Oh No! Your resource didn't save!");
    });
  };
  
  $http({method: 'GET', url: '/skillsquire/user/profile'}).then(function(query) {
    delete query.data.user.password;
    $scope.user = query.data.user;
    $scope.resources = query.data.resources;
    $scope.customResource.user = query.data.user.username;
    var custom = query.data.user.customResourceList;
    if (!custom) $scope.custom_resources = [];
    else $scope.custom_resources = custom;
  });
}]);