'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives','myApp.controllers','ngRoute','smart-table','ui.bootstrap', 'ngMessages'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index',
        controller: 'IndexCtrl'
      }).
      when('/busServices', {
        templateUrl: 'partials/busServices',
        controller: 'servicesCtrl'
      })
      .when('/drivers', {
        templateUrl: 'partials/drivers',
        controller: 'driversCtrl'
      }).
      when('/devices', {
        templateUrl: 'partials/driverapps',
        controller: 'devicesCtrl'
      }).
      when('/changePassword', {
        templateUrl: 'partials/changePassword',
        controller: 'ChangePasswordCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);