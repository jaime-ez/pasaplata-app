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
  .controller('SendCtrl', function ($scope, $http, store, $location, _, COLOMBIA_BANKS, COLOMBIA_BANK_ACCOUNT_TYPES, EMAIL_REGEX, ADD_DASH_RUT) {
  //constants available in scope
  $scope._ = _;
  $scope.colombiaBanks = COLOMBIA_BANKS;
  $scope.colombiaBankAccountTypes = COLOMBIA_BANK_ACCOUNT_TYPES;
  $scope.emailRegex = EMAIL_REGEX;

  $scope.reset = function () {
    // get quotation
    $scope.quotation = store.get('quotation');
    $scope.quotationTime = false;
    $scope.quotationConfirmed = false;

    $scope.remittanceInfo = false;
    $scope.colombiaIdType = 'CC';
    $scope.sourceOpts = {
      email: '',
      bankAccountHolderId: ''
    };

    $scope.destinationOpts = {
      email: '',
      bankAccountHolderId: '',
      bankAccountHolderName: '',
      bankName: '',
      bankAccountType: '',
      bankAccountNumber: ''
    };

  };

  $scope.reset();

  if (!$scope.quotation) {
    $location.path('#/');
  }

  // set remittance source and destination information
  $scope.setRemittanceInfo = function() {
    $scope.remittanceInfo = true;
    $scope.sourceOpts.bankAccountHolderId = ADD_DASH_RUT($scope.sourceOpts.bankAccountHolderId);
    store.set('sourceOpts', $scope.sourceOpts);
    var destinations = store.get('destinationOpts') ? store.get('destinationOpts') : [];
    destinations.push($scope.destinationOpts);
    store.set('destinationOpts', destinations);
  };

  $scope.create = function() {
    $scope.quotationConfirmed = true;
    // we create the remittance at gatewayd
  };

  $scope.edit = function() {
    $scope.remittanceInfo = false;
  };

  $scope.$on('timer-tick', function (event, args) {
    // warn user when he has 10 minutes remaining
    if (args.millis < 10*60*1000) {
      $scope.quotationTime = 'warning';
    }

    // quotation expired
    if (args.millis < 2*1000) {
      $scope.quotationTime = 'expired';
      $scope.quotation = null;
      store.remove('quotation');
    }
  });

  });
