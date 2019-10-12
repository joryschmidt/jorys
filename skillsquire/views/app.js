(function() {
  var app = angular.module('ssq', ['ngRoute', 'ngAnimate']);
  app.config(['$routeProvider', '$locationProvider', '$rootScopeProvider', function($routeProvider, $locationProvider, $rootScopeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      })
      .when('/signup', {
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
      })
      .when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      })
      .when('/dashboard', {
        templateUrl: 'templates/dashboard.html',
        controller: 'dashboardCtrl',
        resolve: {
          check: function(hasRootUser) {
            if (!hasRootUser.check) {
              window.location.href = '/skillsquire/';
            }
          }
        }
      })
      .when('/profile', {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
      })
      .when('/about', {
        templateUrl: 'templates/about.html',
        controller: 'aboutCtrl'
      })
      .when('/detail/:id', {
        templateUrl: 'templates/detail.html',
        controller: 'detailCtrl'
      })
      .otherwise({ redirectTo: '/skillsquire/' });
      
    // $locationProvider.html5Mode(true);
  }]);
  
  app.factory('hasRootUser', ['$rootScope', function($rootScope) {
    return { check: !!$rootScope.rootUser };
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
  
  app.filter('nospaces', function() {
    return function(txt) {
      return txt.replace(/\s/g, '');
    };
  });
  
  app.animation('.slide', function() {
  	var NG_HIDE_CLASS = 'ng-hide';
  	return {
  		beforeAddClass: function(element, className, done) {
  			if(className === NG_HIDE_CLASS) {
  				element.slideUp(100, done);
  			}
  		},
  		removeClass: function(element, className, done) {
  			if(className === NG_HIDE_CLASS) {
  				element.hide().slideDown(100, done);
  			}
  		}
  	};
  });
	
	app.directive('resourceTemplate', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'templates/resource-template.html'
	  };
  });
  
  // the scope attribute creates its own isolated scope for each directive, 
  // so i pass removeCustomRsc to removeRsc with the custom resources
  app.directive('resourceTemplateUser', function() {
    return {
      restrict: 'E',
      scope: {
        rsc: '=',
        removeRsc: '='
      },
      templateUrl: 'templates/resource-template-user.html',
      controller: function($scope) {
        $scope.roundRating = function(rating) { return Math.round(rating) };
      }
    };
  });

  // Angular doesn't like autofocus attribute, this fix
  app.directive('autofocus', ['$timeout', function($timeout) {
    return {
      restrict: 'A',
      link : function($scope, $element) {
        $timeout(function() {
          $element[0].focus();
        });
      }
    };
  }]); 
  
})();