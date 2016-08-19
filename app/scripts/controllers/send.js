'use strict';

var createRemittanceUrl = 'https://gateway.test.dinex.cl/public/remittance/create';

/**
 * @ngdoc function
 * @name remittanceApp.controller:SendCtrl
 * @description
 * # SendCtrl
 * Controller of the remittanceApp
 */
angular.module('remittanceApp')
  .controller('SendCtrl', function ($scope, $http, _, store, $location, COLOMBIA_BANKS, COLOMBIA_BANK_ACCOUNT_TYPES, EMAIL_REGEX) {

  // recuperar quotation
  $scope.quotation = store.get('quotation');

  if (!$scope.quotation) {
    $location.path('#/');
  }

  $scope.colombiaBanks = COLOMBIA_BANKS;
  $scope.colombiaBankAccountTypes = COLOMBIA_BANK_ACCOUNT_TYPES;
  $scope.emailRegex = EMAIL_REGEX;

  $scope.reset = function () {
    $scope.remittanceInfo = false;
    $scope.sourceOpts = {
      email: '',
      bankAccountHolderId: ''
    };

    $scope.destinationOpts = {
      email: '',
      bankAccountHolderId: '',
      bankAccountHolderName: '',
      bankAccountName: '',
      bankAccountType: '',
      bankAccountNumber: ''
    };

  };

  $scope.reset();

  $scope.setRemittanceInfo = function() {
    $scope.remittanceInfo = true;
    store.set('sourceOpts', $scope.sourceOpts);
    var destinations = store.get('destinationOpts') ? store.get('destinationOpts') : [];
    destinations.push($scope.destinationOpts);
    store.set('destinationOpts', destinations);
  };

  $scope.create = function() {
    // we create the remittance at gatewayd
  };

  });
