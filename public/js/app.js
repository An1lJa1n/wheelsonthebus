'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives','myApp.controllers','ngRoute','wxy.pushmenu','smart-table','ui.bootstrap', 'ngMessages']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
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
      when('/driverapps', {
        templateUrl: 'partials/driverapps',
        controller: 'appsCtrl'
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