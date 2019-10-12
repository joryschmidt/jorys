angular.module('admin', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/admin_home.html',
      controller: 'homeCtrl'
    })
    .when('/resource', {
      templateUrl: 'templates/resource.html',
      controller: 'resourceCtrl'
    })
    .when('/resource/edit/:id', {
      templateUrl: 'templates/edit_resource.html',
      controller: 'resourceEditCtrl'
    })
    .when('/create_admin', {
      templateUrl: 'templates/create_admin.html',
      controller: 'createAdminCtrl'
    })
    .when('/delete_resource', {
      templateUrl: 'templates/delete_resource.html',
      controller: 'deleteResourceCtrl'
    })
    .otherwise({ redirectTo: '/' });
}]);