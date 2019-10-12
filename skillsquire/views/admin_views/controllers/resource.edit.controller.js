angular.module('admin')

.controller('resourceEditCtrl', ['$http', '$scope', '$routeParams', '$location', function($http, $scope, $routeParams, $location) {
  
  $http.get('/skillsquire/admin/resource/' + $routeParams.id).then(function(res) {
    console.log('success');
    $scope.resource = res.data;
    
    $scope.submit = function() {
      $http({method: 'PUT', url: '/skillsquire/admin/resource/edit/' + $routeParams.id, data: $scope.resource }).then(function(response) {
        // Having serious problems trying to get Angular to send resource.categories anything but an empty array, so this will have to do for now
        console.log('sent to mongo');
        for (var cat in $scope.categories) {
          if ($scope.categories[cat] == true) {
            $http.put('/skillsquire/admin/resource/add_category/' + $routeParams.id, { cat: cat }).then(function() {
              console.log('Updated category');
            }, function(err) {
              console.log(err);
            });
          } else {
            $http.put('/skillquire/admin/resource/remove_category/' + $routeParams.id, { cat: cat }).then(function() {
              console.log('Removed category');
            }, function(err) {
              console.log(err);
            });
          }
        }
      }, function(response) {
        console.log(response.data);
      });
      $location.path('/skillsquire/');
    };
    
    // This will add new categories to the database
    $scope.addNewCategory = function() {
      $http.put('/skillsquire/categories/add', { cat: $scope.newCat }).then(function(q) {
        console.log('Added category');
        $scope.categories[$scope.newCat] = false;
        $scope.newCat = null;
      }, function(err) {
        console.log('Error: ', err);
      });
    };
    
    $http.get('/skillsquire/categories').then(function(q) {
      $scope.categories = {};
      
      // this is so the in operator works in the next loop and we don't have to loop through the resource categories array for every checkbox
      var cat_object = {};
      for (var i=0; i<$scope.resource.categories.length; i++) {
        cat_object[$scope.resource.categories[i]] = true;
      }
      
      var categories = q.data.categories;
      var len = categories.length;
      for (var i=0; i<len; i++) {
        $scope.categories[categories[i]] = categories[i] in cat_object;
      }
    }, function() {
      console.log('No cats :(');
    });
    
    console.log($scope.resource);
  });
}]);