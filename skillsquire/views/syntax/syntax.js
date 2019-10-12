(function() {
  var app = angular.module('syntax', ['ngRoute']);
  
  // Seems weird to include ngRoute with only one route to serve, but I like the seperation of concerns that ng-view provides
  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'templates/home.html',
      controller: 'homeCtrl'
    })
    .otherwise({ redirectTo: '/skillsquire/' });
  }]);
  
  app.run(['$rootScope', '$http', function($rootScope, $http) {
    $http({method: 'GET', url: '/skillsquire/the_user'}).then(
    function(query) {
      $rootScope.userLoggedIn = true;
      var user = query.data;
      delete user.password;
      $rootScope.rootUser = user;
      if (user.admin) $rootScope.userIsAdmin = true;
    }, 
    function() {
      $rootScope.userLoggedIn = false;
      $rootScope.userIsAdmin = false;
    });
  }]);
  
  app.directive('javascript', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/javascript.html'
    };
  });
  
  app.directive('python', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/python.html'
    };
  });
  
  app.directive('ruby', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/ruby.html'
    };
  });
  
  app.directive('cs', function() {
    return {
      restrict: 'E', 
      templateUrl: 'templates/cs.html'
    };
  });
  
})();