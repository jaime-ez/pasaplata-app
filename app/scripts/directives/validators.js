'use strict';

/**
 * @ngdoc directive
 * @name remittanceApp.directive:validators
 * @description
 * # validators
 */
angular.module('remittanceApp')

.directive('validateIdChile', function () {
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
            ctrl.$setValidity('validateIdChile', true);
            return value;
          } else {
            ctrl.$setValidity('validateIdChile', false);
            return value;
          }
        } else {
          //formato incorrecto
          if(value) {
            ctrl.$setValidity('validateIdChile', false);
            return value;
          }
        }
      };

      ctrl.$formatters.push(validator);
      ctrl.$parsers.unshift(validator);
      attr.$observe('validateIdChile', function() {
        validator(ctrl.$viewValue);
      });
    }
  };
})

.directive('validateIdColombia', function () {
  /*
  * requires scope variable named colombiaIdType
  */
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function (scope, elm, attr, ctrl) {
      if (!ctrl) {
        return;
      }

      var validator = function(value) {

        if (scope.colombiaIdType === 'NIT') {
          var rexp = new RegExp(/^([0-9])+\-([0-9])+$/);
          var nums = [3,7,13,17,19,23,29,37,41,43,47,53,59,67,71];

          if (value && rexp.test(value)) {
            var RUT = value.split('-');
            var elRut = RUT[0];
            var suma = 0;
            var dv;
            for (var i=(elRut.length-1), j=0; i>=0; i--, j++) {
              suma += parseInt(elRut[i], 10)*nums[j];
            }
            dv = (suma % 11) > 1 ? (11 - (suma % 11)) : (suma % 11);
            if (dv === parseInt(RUT[1], 10) && (parseInt(elRut, 10) !== 11111111 && parseInt(elRut, 10) !== 1)) {
              ctrl.$setValidity('validateIdColombia', true);
              return value;
            } else {
              ctrl.$setValidity('validateIdColombia', false);
              return value;
            }
          } else {
            //formato incorrecto
            if(value) {
              ctrl.$setValidity('validateIdColombia', false);
              return value;
            }
          }
        } else if (scope.colombiaIdType === 'CC') {
          //check that is number
          if (/^\d+$/.test(value)) {
            if (value.length === 10) {
              ctrl.$setValidity('validateIdColombia', true);
              return value;
            } else {
              ctrl.$setValidity('validateIdColombia', false);
              return value;
            }
          } else {
            ctrl.$setValidity('validateIdColombia', false);
            return value;
          }
        } else {
          ctrl.$setValidity('validateIdColombia', true);
          return true;
        }
      };

      ctrl.$formatters.push(validator);
      ctrl.$parsers.unshift(validator);
      attr.$observe('validateIdColombia', function() {
        validator(ctrl.$viewValue);
      });
    }
  };
});
