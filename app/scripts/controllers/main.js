'use strict';

/**
 * @ngdoc function
 * @name remittanceApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the remittanceApp
 */
angular.module('remittanceApp')
  .controller('MainCtrl', function ($scope, $http, store, _, OPTIONS) {
  // make lodash available
  $scope._ = _;

  // reset function
  $scope.reset = function () {

    // define variables
    $scope.selected = '';
    $scope.sourceCurrency = 'CLP';
    $scope.sourceAmount = '';
    $scope.destinationCurrency = 'COP';
    $scope.destinationAmount = '';
    $scope.quotation = false;
    $scope.marketExchangeRateActual = 0;
    // clear past quotations
    store.remove('quotation');

    // get basic exchange price
    var basicQuotation = {
        sourceCurrency: $scope.sourceCurrency,
        sourceAmount: 100000
    };

    // this sohould be a service
    $http.post(OPTIONS.quoteRemittanceUrl, basicQuotation).then(function successCallback(response) {
      // we present market exchange rate
      // TODO: change to marketExchangeRateActual after fixing remittancemaker response
      $scope.marketExchangeRateActual = _.round(response.data.quotation.marketExchangeRate, 5);

    }, function errorCallback() {
      $scope.marketExchangeRateActual = -1;
      setTimeout(function(){
        $scope.reset();
        $scope.$broadcast('timer-add-cd-seconds', 10);
      }, 10000);
    });
  };

  $scope.reset();


  // this should be a service
  $scope.quote = function () {
    $scope.quotation = 'pending';
    var quoteOpts = false;
    if ($scope.sourceAmount) {
      quoteOpts = {
        sourceAmount: _.toNumber($scope.sourceAmount),
        sourceCurrency: $scope.sourceCurrency,
        persist: true
      };
    } else if ($scope.destinationAmount) {
      quoteOpts = {
        destinationAmount: _.toNumber($scope.destinationAmount),
        destinationCurrency: $scope.destinationCurrency,
        persist: true
      };
    } else {
      $scope.quotation = false;
      quoteOpts = false;
    }

    if (quoteOpts) {
      $http.post(OPTIONS.quoteRemittanceUrl, quoteOpts).then(function successCallback(response) {
        $scope.quotation = response.data.quotation;
        $scope.quotation.uid = response.data.uid;
        $scope.quotation.expirationTime = response.data.expirationTime;
        store.set('quotation', $scope.quotation);

      }, function errorCallback() {
        $scope.quotation = 'failed';
        store.remove('quotation');
      });
    }
  };
});
