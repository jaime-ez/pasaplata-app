'use strict';

/**
 * @ngdoc directive
 * @name remittanceApp.directive:validators
 * @description
 * # validators
 */
angular.module('remittanceApp')
.directive('validateRut', function () {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function (scope, elm, attr, ctrl) {
      if (!ctrl) {
        return;
      }

      var validator = function(value) {
        var rexp = new RegExp(/^([0-9])+\-([kK0-9])+$/);

        if (value && rexp.test(value)) {
          var RUT = value.split('-');
          var elRut = RUT[0];
          var factor = 2;
          var suma = 0;
          var dv;
          for (var i=(elRut.length-1); i>=0; i--) {
            factor = factor > 7 ? 2 : factor;
            suma += parseInt(elRut[i], 10)*parseInt(factor++, 10);
          }
          dv = 11 -(suma % 11);
          if (dv === 11) {
            dv = 0;
          } else if (dv === 10) {
            dv = "k";
          } if ((dv === RUT[1].toLowerCase() || dv === parseInt(RUT[1])) && (parseInt(elRut) !== 11111111 && parseInt(elRut) !== 1)) {
            ctrl.$setValidity('validateRut', true);
            return value;
          } else {
            ctrl.$setValidity('validateRut', false);
            return value;
          }
        } else {
          //formato incorrecto
          if(value) {
            ctrl.$setValidity('validateRut', false);
            return value;
          }
        }
      };

      ctrl.$formatters.push(validator);
      ctrl.$parsers.unshift(validator);
      attr.$observe('validateRut', function() {
        validator(ctrl.$viewValue);
      });
    }
  };
});
