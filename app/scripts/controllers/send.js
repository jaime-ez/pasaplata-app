'use strict';

/**
 * @ngdoc function
 * @name remittanceApp.controller:SendCtrl
 * @description
 * # SendCtrl
 * Controller of the remittanceApp
 */
angular.module('remittanceApp')
  .controller('SendCtrl', function ($scope, $http, store, $location, $window, _, COLOMBIA_BANKS, COLOMBIA_BANK_ACCOUNT_TYPES, EMAIL_REGEX, ADD_DASH_RUT, CHILE_COMUNAS, OPTIONS) {
  //constants available in scope
  $scope._ = _;
  $scope.colombiaBanks = COLOMBIA_BANKS;
  $scope.colombiaBankAccountTypes = COLOMBIA_BANK_ACCOUNT_TYPES;
  $scope.emailRegex = EMAIL_REGEX;
  $scope.chileComunas = CHILE_COMUNAS;

  $scope.reset = function () {
    // focus on top
    $window.scrollTo(0,0);

    // inform service availability due to bank hours
    // get day of the week
    $scope.day = new Date().getDay();
    // get time of the day
    $scope.timeOfDay = new Date().getHours();

    // get quotation
    $scope.quotation = store.get('quotation');
    $scope.quotationTime = false;
    $scope.quotationConfirmed = false;

    $scope.remittanceInfo = false;
    $scope.sourceOpts = {
      email: '',
      bankAccountHolderId: '',
      homeAddress: {
        address: '',
        comuna: ''
      }
    };

    $scope.destinationOpts = {
      phoneNumber: '',
      phoneNumberType: '',
      bankAccountHolderId: '',
      bankAccountHolderName: '',
      bankName: store.get('destinationBankName').bankName,
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
    // set source info
    $scope.remittanceInfo = true;
    $scope.sourceOpts.bankAccountHolderId = ADD_DASH_RUT($scope.sourceOpts.bankAccountHolderId);
    store.set('sourceOpts', $scope.sourceOpts);

    // set destination info
    var destinations = store.get('destinationOpts') ? store.get('destinationOpts') : [];

    if ($scope.phoneNumberType) {
      $scope.destinationOpts.phoneNumberType = $scope.phoneNumberType;
    }

    destinations.push($scope.destinationOpts);
    store.set('destinationOpts', destinations);
    $window.scrollTo(0,0);
  };

  $scope.create = function() {
    // TODO handle different states of the process at the view
    $scope.quotationConfirmed = 'pending';
    // we create the remittance at gatewayd
    var remittanceOpts = {
      sourceInfo: {
        bank_account_holder_id: $scope.sourceOpts.bankAccountHolderId,
        quotationUid: $scope.quotation.uid,
        email: $scope.sourceOpts.email,
        homeAddress: $scope.sourceOpts.homeAddress
      },
      destinationInfo: {
        bank_account_holder_name: $scope.destinationOpts.bankAccountHolderName,
        bank_account_holder_id: $scope.destinationOpts.bankAccountHolderId,
        bank_account_number: $scope.destinationOpts.bankAccountNumber,
        bank_name: $scope.destinationOpts.bankName,
        bank_account_type: $scope.destinationOpts.bankAccountType,
        phoneNumber: $scope.destinationOpts.phoneNumber,
        phoneNumberType: $scope.destinationOpts.phoneNumberType
      }
    };

    $http.post(OPTIONS.createRemittanceUrl, remittanceOpts).then(function successCallback() {
      $scope.quotationConfirmed = 'success';
    }, function errorCallback(err) {
      $scope.quotationConfirmed = 'error';
      console.log(err);
      if (err.data.error.indexOf('address') > -1 && err.data.error.indexOf('already exists') > -1) {
        $scope.quotationConfirmedError = 'La cuenta bancaria de destino ya está registrada con otros datos. Cotiza nuevamente y asegúrate de ingresar la información correcta.';
      }
    });
  };

  $scope.edit = function() {
    $scope.remittanceInfo = false;
    $window.scrollTo(0,0);
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
