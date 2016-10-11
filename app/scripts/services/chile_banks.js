'use strict';

/**
 * @ngdoc service
 * @name remittanceApp.chileBanks
 * @description
 * # chileBanks
 * Constant in the remittanceApp.
 */
var chileBanks = [
  'BANCO SECURITY',
  'BANCO ITAU CHILE',
  'BANCO PARIS',
  'BANCO SANTANDER',
  'BANCO CONSORCIO',
  'BBVA',
  'SCOTIABANK',
  'CORPBANCA',
  'BANCOESTADO',
  'BANCO DE CHILE - EDWARDS',
  'BANCO BICE',
  'BCI',
  'BANCO RIPLEY',
  'BANCO FALABELLA'
];

var chileBankAccountTypes = ['Cuenta Corriente','Cuenta Vista/RUT','Cuenta de Ahorro'];

angular.module('remittanceApp')
  .constant('CHILE_BANK_ACCOUNT_TYPES', chileBankAccountTypes)
  .constant('CHILE_BANKS', chileBanks);
