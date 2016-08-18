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

angular.module('remittanceApp')
  .constant('_', window._)
  .constant('COLOMBIA_BANKS', colombiaBanks)
  .constant('COLOMBIA_BANK_ACCOUNT_TYPES', colombiaBankAccountTypes);
