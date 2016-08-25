'use strict';

/**
 * @ngdoc directive
 * @name remittanceApp.directive:directives
 * @description Miscelaneous directives
 * # directives
 */
angular.module('remittanceApp')
  .directive('focusHere', function ($timeout) {
  return function($scope, element) {
    $timeout(function(){
      $scope.$watch(function () {return element.is(':visible');}, function(newValue) {
        if (newValue === true) {
         element.focus();
        }
      });
    });
  };
});