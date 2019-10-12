angular.module('admin')

.controller('resourceCtrl', ['$http', '$scope', '$location', function($http, $scope, $location) {
  
  $scope.resource = {};
  $scope.resource.categories = [];
  $scope.categories = {};
  
  $scope.submit = function() {
    $http({method: 'POST', url: '/skillsquire/admin/resource', data: $scope.resource }).then(function(response) {
      // Having serious problems trying to get Angular to send resource.categories anything but an empty array, so this will have to do for now
      for (var cat in $scope.categories) {
        if ($scope.categories[cat] == true) {
          $http.put('/skillsquire/admin/resource/add_category/' + response.data._id, { cat: cat }).then(function() {
            console.log('Updated category');
          }, function(err) {
            console.log(err);
          });
        }
      }
    }, function(response) {
      console.log(response.data);
    });
    $location.path('/');
  };
  
  // Adds new categories to the database
  $scope.addNewCategory = function() {
    $http.put('/skillsquire/categories/add', { cat: $scope.newCat }).then(function(q) {
      console.log('Added category');
      $scope.categories[$scope.newCat] = false;
      $scope.newCat = null;
    }, function(err) {
      console.log('Error: ', err);
    });
  };
  
  $scope.removeQItem = function(id) {
    $http.delete('/skillsquire/admin/resource/queue/' + id).then(function(response) {
      $scope.queue.forEach(function(que, i) {
        if (que._id == id) $scope.queue.splice(i, 1);
      });
      var data = response.data;
      $scope.resource.name = data.name;
      $scope.resource.link = data.link;
      $scope.resource.color = data.color;
      $scope.resource.description = data.description;
    }, function() {
      console.log('The deletion did not work as expected');
    });
  };
  
  $http.get('/skillsquire/categories').then(function(q) {
    var categories = q.data.categories;
    var len = categories.length;
    for (var i=0; i<len; i++) {
      $scope.categories[categories[i]] = false;
    }
  }, function() {
    console.log('No cats :(');
  });
  
  $http.get('/skillsquire/admin/resource/queue').then(function(queue) {
    $scope.queue = queue.data;
  });
}])

.controller('deleteResourceCtrl', ['$http', '$scope', function($http, $scope) {
  $http({method:'GET', url: '/skillsquire/resources'}).then(function(query) {
    $scope.resources = query.data;
  });
  
  $scope.$watch($scope.resources, function() {
    
  });
  
  $scope.goodbye = function(rscId, rscName) {
    if (window.confirm(`Are you sure you want to delete ${rscName}?`)) {
      $http({ method: 'DELETE', url: '/skillsquire/admin/resource/' + rscId }).then(function() {
        $scope.resources.forEach(function(rs, i) {
          if(rs.name == rscName) $scope.resources.splice(i, 1);
        });
      });
    }
  };
}]);