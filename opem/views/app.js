(function() {
  var app = angular.module('opem', ['ngRoute']);
  
  app.config(['$routeProvider', '$locationProvider', '$rootScopeProvider', function($routeProvider, $locationProvider, $rootScopeProvider) {
    $routeProvider
      .when('/', {
        template: '',
        redirectTo: '/dashboard'
      })
      .when('/dashboard', {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      })
      .when('/hosted', {
        templateUrl: 'templates/hosted_events.html',
        controller: 'hostedCtrl'
      })
      .when('/results', {
        templateUrl: 'templates/results.html',
        controller: 'resultsCtrl'
      })
      .when('/event/:id', {
        templateUrl: 'templates/event.html',
        controller: 'eventCtrl'
      })
      .when('/error', {
        templateUrl: 'templates/error.html'
      })
      .otherwise({ redirectTo: '/' });
  }]);
  
  app.factory('hasRootUser', ['$rootScope', function($rootScope) {
    console.log($rootScope);
    return { check: !!$rootScope.rootUser };
  }]);
  
  app.factory('search', [function() {
    // Create an object to return with methods to store and retrieve the results of performing a search
    var obj = {};
    
    obj.storeResults = function(results) {
      obj.results = results;
    };
    
    obj.getResults = function() {
      return obj.results;
    }
    
    return obj;
  }]);
  
  app.factory('eventNotifications', [function() {
    
    var service = {};
    
    service.hosted = function(user) {
      if (user.hosted_events.length > 0) {
        jQuery('#hosted-notification').css('display', 'flex');
        document.getElementById('hosted-notification').innerText = user.hosted_events.length.toString();
      }
    }
    
    return service;
  }]);
  
  // this service populates event object with necessary properties for display in the event cards
  app.factory('eventCardService', [function() {
    var service = {};
    service.format = function(events) {
      var date_options = {
        // weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      };
      
      var time_options = {
        hour: 'numeric'
      }
      
      events.forEach(function(e) {
        var date = new Date(e.date);
        e.calendar = date.toLocaleDateString('en-US', date_options);
        
        var start = new Date(e.time_start);
        e.start = start.toLocaleTimeString('en-US', time_options);
        
        if (e.time_end) {
          var end = new Date(e.time_end);
          e.end = end.toLocaleTimeString('en-US', time_options);
        }
        
        var until = Date.parse(e.date) - Date.now();
        
        if (until > 0) e.remaining = Math.floor(until / 86400000);
        
        e.spots_left = e.spots - e.attendees.length;
      });
      
      return events;
    }
    
    return service;
  }]);
  
  app.directive('popup', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/_popup.html'
    }
  });
  
  app.directive('eventCard', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/_event-card.html'
    }
  });
  
  // redirects user to dashboard if logged in, to the login page otherwise
  // app.controller('redirect', ['$http', function($http) {
  //   $http.get('/opem/user').then(function() {
  //     window.location.href = '/opem/#!/dashboard'
  //   }, function() {
  //     window.location.href = '/opem/login';
  //   });
  // }]);
  
  app.run(['$http', function($http) {
    $http.get('/opem/user').then(function(user) {
      console.log('User is logged in');
    });
  }]);
  
})();
