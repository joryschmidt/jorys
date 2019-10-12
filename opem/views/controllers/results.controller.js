angular.module('opem')

.controller('resultsCtrl', ['$scope', 'search', 'eventCardService', function($scope, search, eventCardService) {
  $scope.search_results = eventCardService.format(search.getResults());
}]);
