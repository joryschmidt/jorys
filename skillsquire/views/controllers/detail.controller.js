angular.module('ssq')

.controller('detailCtrl', ['$http', '$scope', '$routeParams', '$rootScope', '$location', function($http, $scope, $routeParams, $rootScope, $location) {
  $scope.data = {};
  
  var button = document.createElement('span');
  button.innerText = 'Added!';
  button.classList.add('btn');
  button.classList.add('btn-danger');
  
  var id = $routeParams.id;
  var user = $rootScope.rootUser;
  
  $scope.newReview = {
    resource: id
  };
  
  if (user) $scope.newReview.user = user._id;
  
  
  $http.get('/skillsquire/resource/' + id).then(function(query) {
    $scope.resource = query.data;
    $scope.data.name = query.data.className;
    $scope.data.database_rating = Math.round(query.data.rating);
    if (user) {
      if ($rootScope.rootUser.ratings) $scope.data.rating = $rootScope.rootUser.ratings[$scope.resource.className];
      user.resourceList.forEach(function(res_id, index) {
        if (res_id == id) {
          // document.getElementById('add_button').remove();
        }
      });
    }
    
    $http.get('/skillsquire/resource/reviews/' + id).then(function(query) {
      $scope.reviews = query.data;
    });
  });
  
  $scope.submit = function() {
    $http.post('/skillsquire/resource/review', $scope.newReview).then(function(response) {
      console.log(response);
    });
  }
  
  $scope.addToDashboard = function() {
    if (user) {
      $http.put('/skillsquire/user/add_resource', { id: id });
      
      // this could use some sprucing up
      var adder = document.getElementById('add_button');
      adder.parentNode.replaceChild(button, adder);
      $rootScope.rootUser.resourceList.push(id);
    } else {
      window.location.href = '/skillsquire/#!/login';
    }
  };
  
  $scope.editResource = function() {
    window.location.href='/skillsquire/admin/#!/resource/edit/' + id;
  }
  
  
  // $scope.submit = function() {
  //   if (user) {
  //     $http.post('/user/rate', $scope.data).then(function(response) {
  //       $rootScope.rootUser.ratings[$scope.data.name] = $scope.data.rating;
  //     });
  //   }
  //   else {
  //     window.location.href = '/#!/login';
  //   }
  // };
}]);