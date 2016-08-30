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

      // for buttons
      elem.bind('click', function(e) {
        e.preventDefault();
        document.querySelector('#' + _.toString(attr.focusNext)).focus();
      });

      //for text input
      elem.bind('keydown', function(e) {
        var code = e.keyCode || e.which;
        if (code === 13) {
          e.preventDefault();
          document.querySelector('#' + _.toString(attr.focusNext)).focus();
        }
      });
    }
  };
})

.directive('onError', function() {
  return {
    restrict: 'AE',
    link: function($scope, elem, attr) {

      /** Usage:
        The input group must be in a div with class="input-group" in order to use bootstrap classes
        Fields must have a name property
        on-error must be called with "fieldName:erorrType:message"
        example <div on-error="srcAmnt:required:Debes llenar este campo">
      **/

      var fieldName = attr.onError.split(':')[0];
      var errorName = attr.onError.split(':')[1];
      var errorMessage = typeof attr.onError.split(':')[2] === 'undefined' ? 'error' : attr.onError.split(':')[2];
      var formController = elem.inheritedData('$formController');
      var formName = formController.$name;

      function updateError() {
        var field = formController[fieldName];
        var fieldErrors = field.$error;

        if (!field) {
          return;
        }

        if (fieldErrors[errorName]) {
          // error is activated
          // add message if not already
          if (elem[0].firstElementChild && elem[0].firstElementChild.id === 'helpBlock' + errorName) {
            return;
          } else {
            elem.append('<span id="helpBlock' + errorName + '"' + 'class="help-block" style="">' + errorMessage + '</span>');
          }
          // set bootstrap class
          if (elem[0].previousElementSibling && elem[0].previousElementSibling.className === 'input-group') {
            elem[0].previousElementSibling.className = 'input-group has-error';
          }


        } else {
          // remove message
          if (elem[0].firstElementChild && elem[0].firstElementChild.id === 'helpBlock' + errorName) {
            elem[0].firstElementChild.remove();
          }
          // and reset bootstrap class
          if (elem[0].previousElementSibling && elem[0].previousElementSibling.className === 'input-group has-error') {
            elem[0].previousElementSibling.className = 'input-group';
          }

        }
      }

      $scope.$watch(formName + '.' + fieldName + '.$error', updateError, true);
      $scope.$watch(formName + '.' + fieldName + '.$pristine', updateError);
    }
  };
});

