angular.module("myApp.controllers", [])
.controller("IndexCtrl", function ($rootScope, $scope, $http) {
    $http.get('/schoolInfo').
          success(function(data, status, headers, config) {
              $rootScope.userName = data.name;
              $rootScope.schoolName = data.schoolName;
              initMap(data.lat, data.lon);
    });
    var initMap = function(lat,lon){
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: new google.maps.LatLng(lat, lon),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      var infowindow = new google.maps.InfoWindow();
      var marker = new google.maps.Marker({
          position: new google.maps.LatLng(19.229066, 72.866455),
          animation: google.maps.Animation.DROP,
          label:"SSRVM",
          icon: "http://google-maps-icons.googlecode.com/files/university.png",
          map: map
      });
      var marker1 = new google.maps.Marker({
          position: new google.maps.LatLng(19.225320, 72.854617),
          animation: google.maps.Animation.DROP,
          label: {text:'2', color: 'yellow'},
          icon: "http://www.autogari.ro/images/bus-marker2.png",
          map: map
      });


      var marker2 = new google.maps.Marker({
          position: new google.maps.LatLng(19.221865, 72.851163),        animation: google.maps.Animation.DROP,
          label: {text:'3', color: 'yellow'},
          icon: "http://www.autogari.ro/images/bus-marker2.png",
          map: map
      });

      var marker3 = new google.maps.Marker({
          position: new google.maps.LatLng(19.220650, 72.854016),
          animation: google.maps.Animation.DROP,
          label: {text:'4', color: 'yellow'},
          icon: "http://www.autogari.ro/images/bus-marker2.png",
          map: map
      });

      var marker4 = new google.maps.Marker({
          position: new google.maps.LatLng(19.219302, 72.839736),
          animation: google.maps.Animation.DROP,
          label: {text:'5', color: 'yellow'},
          icon: "http://www.autogari.ro/images/bus-marker2.png",
          map: map
      });
    };     
    

    /*for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0], locations[i][6]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }*/

}).controller('userCtrl', function($scope,$http,$window) {
      $scope.logout = function(){
        $http.get('/logout').
          success(function(data, status, headers, config) {
            $window.location.href = '/login';
        });
      };
});