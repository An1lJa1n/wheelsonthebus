'use strict';
angular.module('myApp.directives', [])
	.directive('appVersion', ['version', function(version) {
	    return function(scope, elm, attrs) {
	      elm.text(version);
	    };
  	}])
  .directive("imeiValidator", function(){
      var isIMEI = function(s) {
        var etal = /^[0-9]{15}$/;
        if (!etal.test(s)) return false;
        var sum = 0; 
        var mul = 2; 
        var l = 14;
        for (var i = 0; i < l; i++) {
          var digit = s.substring(l-i-1,l-i);
          var tp = parseInt(digit,10)*mul;
          if (tp >= 10) sum += (tp % 10) +1;
          else  sum += tp;
          if (mul == 1) mul++;
          else mul--;
        }
        var chk = ((10 - (sum % 10)) % 10);
        if (chk != parseInt(s.substring(14,15),10)) return false;
        return true;
      };
      return {
         restrict: 'A',
         require: 'ngModel',
         link: function(scope, ele, attrs, ctrl){
           ctrl.$parsers.unshift(function(value) {
              if(value){
                var valid = isIMEI(value);
                ctrl.$setValidity('invalidIMEICode', valid);
              }
              return valid ? value : undefined;
            });
         }
      }
  })
  .directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{ title }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;
        scope.isFormInvalid = true;
        scope.$watch(attrs.visible, function(value){
          if(value == true){
            $(element).modal('show');
            $(".modal-dialog").parent().find(".modal-backdrop").css("z-index",0);
          }
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });
