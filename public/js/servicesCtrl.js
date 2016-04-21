'use strict';
angular.module("myApp.controllers")
  .controller('servicesCtrl',function($scope,$http,$filter) {
    $scope.service = {};
    $scope.services = [];
    $scope.hstep = 1;
    $scope.mstep = 15;
    $scope.drivers = [];
    $scope.apps=[];
    $scope.showModal = false;
    $scope.selectedDriver;
    $scope.selectedApp;
    
    $http.get('/api/drivers/getList').
      success(function(data, status, headers, config) {
        for(var key in data)
          $scope.drivers.push({key: key, name: data[key].name});
    });
    $scope.setSelectedDriver = function(val){
        $scope.selectedDriver = val;
    };
    $scope.setSelectedApp = function(val){
        $scope.selectedApp = val;
    };
    $scope.getTime = function(val){
        return (new Date(val)).toTimeString().split(' ')[0].substring(0,5); 
    };
    $http.get('/api/driverapps/getList').
      success(function(data, status, headers, config) {
        for(var key in data)
          $scope.apps.push({key: key, mobileNumber: data[key].mobileNumber});
    });      
    $scope.toggleModal = function(){
        $scope.service = {};
        $scope.selectedDriver= null;
        $scope.selectedApp = null;  
        $scope.showModal = !$scope.showModal;
    };
    $scope.editItem = function(row){
      $scope.selectedDriver = row.driver;
      $scope.selectedApp = row.app;
      $scope.service = row;
      $scope.showModal=true;
    };
    $scope.save  = function(){
      if($scope.service.key){ //update
        var key = $scope.service.key;
        $scope.service.driver = $scope.selectedDriver;
        $scope.service.app = $scope.selectedApp;
        delete $scope.service.key;
        $http.put('/api/services/' + key, $scope.service).
        success(function(data) {
            bindGrid(data);
            $scope.service = {};
            $scope.showModal=false;
        });
      }  
      else{//Add new
        $http.post('/api/services/save', $scope.service).success(function(data) {
            bindGrid(data);
            $scope.service = {};
            $scope.showModal=false;
        });
      }
    };
    $scope.removeItem= function(row){
      $http.delete('/api/services/' + row.key).
        success(function(data) {
          bindGrid(data);
      });
    };
    var bindGrid =function(data){
      $scope.services=[];
      for(var key in data){
        var item = data[key];
        item.key =key;
        $scope.services.push(item); 
      }
    };
    $http.get('/api/services/getList').
      success(function(data, status, headers, config) {
         bindGrid(data);
    });
});