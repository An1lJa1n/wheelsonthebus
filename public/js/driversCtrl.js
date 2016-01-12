'use strict';
angular.module("myApp.controllers")
  .controller('driversCtrl',function($scope,$http,$filter) {
    $scope.driver = {};
    $scope.drivers = [];
    
    $scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.driver = {};
        $scope.showModal = !$scope.showModal;
    };
    $scope.editItem = function(row){
      $scope.driver = row;
      $scope.showModal=true;
    };
    $scope.save  = function(){
      if($scope.driver.key){ //update
        var key = $scope.driver.key;
        delete $scope.driver.key;
        $http.put('/api/drivers/' + key, $scope.driver).
        success(function(data) {
            bindGrid(data);
            $scope.driver = {};
            $scope.showModal=false;
        });
      }  
      else{//Add new
        $http.post('/api/drivers/save', $scope.driver).success(function(data) {
            bindGrid(data);
            $scope.driver = {};
            $scope.showModal=false;
        });
      }
    };
    $scope.removeItem= function(row){
      $http.delete('/api/drivers/' + row.key).
        success(function(data) {
          bindGrid(data);
      });
    };
    var bindGrid =function(data){
      $scope.drivers=[];
      for(var key in data){
        var item = data[key];
        item.key =key;
        $scope.drivers.push(item); 
      }
    };
    $http.get('/api/drivers/getList').
      success(function(data, status, headers, config) {
         bindGrid(data);
    });
});