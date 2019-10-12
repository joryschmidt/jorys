angular.module('opem')

.controller('eventCtrl', ['$scope', '$http', '$routeParams', 'eventCardService', function($scope, $http, $routeParams, eventCardService) {
  var id = $routeParams.id;
  
  $http.get('/opem/event/' + id).then(function(query) {
    var event = eventCardService.format([query.data])[0];
    
    // check if event has been geocoded
    if (!event.geocode) {
      var encoded_address = event.address.replace(/\s/g, '+');
      $http.get('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCE-gtqs2EHY-IRIdzVU4_7C7oyQA7oTv8&address=' + encoded_address).then(function(response) {
        event.geocode = response.data.results[0].geometry.location;
        $scope.event = event;
        console.log(event.geocode);
        
        // now save geocode by updating event
        $http.post('/opem/event/geocode/' + event._id, { geocode: event.geocode }).then(function(response) {
          console.log(response);
        }, function(err) {
          console.log(err);
        });
      }, function(err) {
        console.log(err);
      });
    }
    
    $scope.event = event;
    
  }, function() {
    console.log('event retrieval failed');
  });
}]);