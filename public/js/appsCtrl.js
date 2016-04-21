'use strict';
angular.module("myApp.controllers").controller('devicesCtrl', function($scope,$http) {
    $scope.app = {};
    $scope.apps = [];
    $scope.showModal = false;
    
    $scope.setFormScope = function(form){$scope.form = form;};
    
    $scope.toggleModal = function(){
        $scope.app = {};
        $scope.showModal = !$scope.showModal;
    };
    $scope.getStatus= function(val){
      return val? "Active":"Inactive";
    };
    $scope.editItem = function(row){
      $scope.app = row;
      $scope.showModal=true;
    };
    
    $scope.save  = function(){
      if(!$scope.form.appRegistratiion.$valid){
          alert("Please specify the valid values");
          return;
      }
      if($scope.app.key){ //update
        var key = $scope.app.key;
        delete $scope.app.key;
        $http.put('/api/driverapps/' + key, $scope.app).
        success(function(data) {
            bindGrid(data);
            $scope.app = {};
            $scope.showModal=false;
        });
      }else{
        $http.post('/api/driverapps/save', $scope.app).success(function(data) {
          bindGrid(data);
          $scope.app = {};
          $scope.showModal=false;
        });
      }  
    };
    
    $scope.removeItem= function(row){
      $http.delete('/api/driverapps/' + row.key).
        success(function(data) {
          bindGrid(data);
      });
    };
    var bindGrid =function(data){
      $scope.apps=[];
      for(var key in data){
        var item = data[key];
        item.key =key;
        item.mobileNumber = parseInt(item.mobileNumber);
        $scope.apps.push(item); 
      }
    };
    
    $http.get('/api/driverapps/getList').
      success(function(data, status, headers, config) {
         bindGrid(data);
    });

});