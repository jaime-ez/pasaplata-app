'use strict';

/**
 * @ngdoc service
 * @name remittanceApp.constants
 * @description
 * # constants
 * Constant in the remittanceApp.
 */

var emailRegex = /^([a-zA-Z0-9_\.\-]){0,100}\@(([a-zA-Z0-9\-]){0,100}\.)+([a-zA-Z0-9]{2,4})+$/;

var chileHolidays = ['8/11/2016', '14/3/2017', '19/3/2017', '1/4/2017'];

function addDashRut(_value) {
  if (typeof _value === 'string') {
    var inserAt = _value.length - 1;
    return _value.substr(0, inserAt) + '-' + _value.substr(inserAt);
  } else {
    return '';
  }
}

angular.module('remittanceApp')
  .constant('_', window._)
  .constant('EMAIL_REGEX', emailRegex)
  .constant('ADD_DASH_RUT', addDashRut)
  .constant('OPTIONS', window.Options)
  .constant('CHILE_HOLIDAY', chileHolidays);
