angular.module('opem')

.controller('homeCtrl', ['$scope', '$http', '$location', 'search', 'eventNotifications', function($scope, $http, $location, search, eventNotifications) {
  
  $scope.event = {};
  
  var getUserData = function() {
    $http.get('/opem/user/current').then(function(q) {
      var user = q.data;
      $scope.user = user;
      $scope.event.host = user._id;
      
      // this makes the notification show up
      eventNotifications.hosted(user);
    }, function(response) {
      console.log('Sorry bub, but you have to sign up to see that page');
      window.location.href = '/opem/login';
    });
  };
  getUserData();
  
  $scope.logout = function() {
    $http.get('/opem/logout').then(function(response) {
      delete $scope.user;
      window.location.href = '/opem/login';
      console.log('logged out');
    }, function() {
      console.log("couldn't log out");
    });
  };
  
  $scope.submit = function() {
    $http.post('/opem/event', $scope.event).then(function(response) {
      console.log('event has been created');
      $scope.event = {};
      // Closes the popup if it was successfully saved
      jQuery('#popup2').css({ visibility: 'hidden', opacity: 0 });
      // calling this here updates view after creating event
      getUserData();
    }, function(err) {
      console.log(err.data);
    });
  };
  
  // submits search query and redirects to results page
  $scope.eventSearch = function() {
    $http.post('/opem/event/search/name', { name: $scope.search_name }).then(function(events) {
      search.storeResults(events.data);
      $location.path('/results');
    }, function() {
      console.log('Failure finding event');
      alert('Search must not be blank');
    });
  }
}]);