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
})

.directive('focusNext', function(_) {
  return {
    restrict: 'A',
    link: function($scope, elem, attr) {

      /** Usage:
        <input focus-next="here">
        <input id="here">
        Upon pressing ENTER key the directive will switch focus to
        the next declared field
        The last field should not have next-focus directive to avoid
        focusing on non-existing element.
        Works for Web, iOS (Go button) & Android (Next button) browsers,
      **/

      elem.bind('keydown', function(e) {
        var code = e.keyCode || e.which;
        if (code === 13) {
          e.preventDefault();
          document.querySelector('#' + _.toString(attr.focusNext)).focus();
        }
      });
    }
  };
});
