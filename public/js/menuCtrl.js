angular.module("myApp.controllers", [])
.controller("IndexCtrl", function ($scope, $http) {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: new google.maps.LatLng(26.2215, 78.1780),
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
        label:"2",
        icon: "http://www.autogari.ro/images/bus-marker2.png",
        map: map
    });


    var marker2 = new google.maps.Marker({
        position: new google.maps.LatLng(19.221865, 72.851163),        animation: google.maps.Animation.DROP,
        label:"3",
        icon: "http://www.autogari.ro/images/bus-marker2.png",
        map: map
    });

    var marker3 = new google.maps.Marker({
        position: new google.maps.LatLng(19.220650, 72.854016),
        animation: google.maps.Animation.DROP,
        label:"4",
        icon: "http://www.autogari.ro/images/bus-marker2.png",
        map: map
    });

    var marker4 = new google.maps.Marker({
        position: new google.maps.LatLng(19.219302, 72.839736),
        animation: google.maps.Animation.DROP,
        label:"5",
        icon: "http://www.autogari.ro/images/bus-marker2.png",
        map: map
    });

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

}).controller('menuCtrl', function($scope,$http,$window) {
        $scope.menu = {
        title: 'All Categories',
        id: 'menuId',
        icon: 'fa fa-bars',
        items: [
          {
            name: 'Home',
            link: '/addPost'
          },{
            name: 'Bus Services',
            link: '/busServices'
          }, {
            name: 'Drivers',
            link: '/drivers'
          }, {
            name: 'Apps',
            link: 'driverapps'
          }, {
            name: 'Change Password',
            link: 'changePassword'
          }          
          ]
      };
      $scope.logout = function(){
        $http.get('/logout').
          success(function(data, status, headers, config) {
            $window.location.href = '/login';
        });
      };

      $scope.events = [];
      $scope.options = {
        containersToPush: [$('#pushobj')],
        direction: 'ltr',
        onExpandMenuStart: function() {
          document.getElementById("pushobj").style.width="75%";
        },
        onExpandMenuEnd: function() {
        },
        onCollapseMenuStart: function() {
          document.getElementById("pushobj").style.width="94%";
        },
        onCollapseMenuEnd: function() {
        },
        onGroupItemClick: function(event, item) {
        },
        onItemClick: function(event, item) {
        },
        onTitleItemClick: function(event, menu) {
        },
        onBackItemClick: function() {
        }
      };
});