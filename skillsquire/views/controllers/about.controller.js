angular.module('ssq')

.controller('aboutCtrl', ['$http', '$scope', function($http, $scope) {
  $scope.rsc = {
    name: 'Resource Name',
    className: 'resourcename',
    link: '#!/about',
    description: "Here is the quick resource description and average user rating",
    color: 'aqua',
    rating: 3
  }; 
  
  $scope.roundRating = function(rating) {
    return Math.round(rating);
  };

}]);