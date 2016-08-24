'use strict';

/**
 * @ngdoc service
 * @name remittanceApp.constants
 * @description
 * # constants
 * Constant in the remittanceApp.
 */
var colombiaBanks = [
  'AV Villas',
  'Bancamía',
  'Banagrario',
  'Bancolombia',
  'Banco Compartir',
  'Banco Cooperativo',
  'Banco Coomeva',
  'Banco Corpbanca',
  'Banco de Bogotá',
  'Banco de Occidente',
  'Banco Falabella',
  'Banco Finandina',
  'Banco Mundo Mujer',
  'Banco Multibank',
  'Banco Pichincha',
  'Banco Popular',
  'Banco Procredit',
  'Banco Santander',
  'Banco WWB',
  'BBVA Colombia',
  'Caja Social BCSC',
  'Citibank Colombia',
  'Colpatria',
  'Davivienda',
  'GNB Sudameris'
];

var colombiaBankAccountTypes = [
  'Cuenta Corriente', 'Cuenta Ahorro'
];

var emailRegex = /^([a-zA-Z0-9_\.\-]){0,100}\@(([a-zA-Z0-9\-]){0,100}\.)+([a-zA-Z0-9]{2,4})+$/;

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
  .constant('COLOMBIA_BANKS', colombiaBanks)
  .constant('COLOMBIA_BANK_ACCOUNT_TYPES', colombiaBankAccountTypes)
  .constant('EMAIL_REGEX', emailRegex)
  .constant('ADD_DASH_RUT', addDashRut);
