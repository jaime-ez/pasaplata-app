'use strict';

/**
 * @ngdoc directive
 * @name remittanceApp.directive:validators
 * @description
 * # validators
 */
angular.module('remittanceApp')

.directive('validateIdColombia', function (_) {
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

        if (_.toString(attr.validateIdColombia) === 'NIT') {
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
        } else if (_.toString(attr.validateIdColombia) === 'CC') {
          //check that is number
          if (/^\d+$/.test(value)) {
            if (value.length >= 8) {
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
})

.directive('maxValue', function (_) {
  /*
  * validates a max numerical value for string input
  */
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function (scope, elm, attr, ctrl) {
      if (!ctrl) {
        return;
      }

      var validator = function(value) {
        var valueAsNumber = value ? _.toNumber(value.replace(/[a-zA-Z!\?>:;,\$\|<@#%\^&\*\)\(\+\/\\={}\[\]_]/g, '')) : 0;

        if (attr.maxValue) {
          if (valueAsNumber <= _.toNumber(attr.maxValue)) {
            ctrl.$setValidity('maxValue', true);
            return value;
          } else {
            ctrl.$setValidity('maxValue', false);
            return value;
          }
        } else {
          ctrl.$setValidity('maxValue', true);
          return value;
        }
      };

      ctrl.$formatters.push(validator);
      ctrl.$parsers.unshift(validator);
      attr.$observe('maxValue', function() {
        validator(ctrl.$viewValue);
      });
    }
  };
})

.directive('minValue', function (_) {
  /*
  * validates a min numerical value for string input
  */
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function (scope, elm, attr, ctrl) {
      if (!ctrl) {
        return;
      }

      var validator = function(value) {
        var valueAsNumber = value ? _.toNumber(value.replace(/[a-zA-Z!\?>:;,\$\|<@#%\^&\*\)\(\+\/\\={}\[\]_]/g, '')) : 0;

        if (attr.minValue) {
          if (valueAsNumber >= _.toNumber(attr.minValue)) {
            ctrl.$setValidity('minValue', true);
            return value;
          } else {
            ctrl.$setValidity('minValue', false);
            return value;
          }
        } else {
          ctrl.$setValidity('minValue', true);
          return value;
        }
      };

      ctrl.$formatters.push(validator);
      ctrl.$parsers.unshift(validator);
      attr.$observe('minValue', function() {
        validator(ctrl.$viewValue);
      });
    }
  };
})

.directive('phoneNumber', function (_, ngPhone) {

  return {
    restrict: 'A',
    require: '?ngModel',
    link: function (scope, elm, attr, ctrl) {
      if (!ctrl) {
        return;
      }

      var validator = function(value) {

        var countryCode = _.toString(attr.phoneNumber);
        var isValid = ngPhone.isValidNumber(value, countryCode);

        if (isValid) {
          var formattedPhone = ngPhone.format(value, countryCode);
          ctrl.$setValidity('phoneNumber', true);
          // sets scope variable with phoneNumberType
          scope.phoneNumberType = ngPhone.getNumberType(formattedPhone, countryCode);
          return formattedPhone;
        } else {
          ctrl.$setValidity('phoneNumber', false);
          return value;
        }
      };

      ctrl.$formatters.push(validator);
      ctrl.$parsers.unshift(validator);
      attr.$observe('phoneNumber', function() {
        validator(ctrl.$viewValue);
      });
    }
  };
});
