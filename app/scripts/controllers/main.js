'use strict';

var quoteRemittanceUrl = 'https://gateway.test.dinex.cl/public/remittance/quote';

/**
 * @ngdoc function
 * @name remittanceApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the remittanceApp
 */
angular.module('remittanceApp')
  .controller('MainCtrl', function ($scope, $http) {
  var self = this;

  // get basic exchange price
  self.basicQuotation = {
      sourceCurrency: 'CLP',
      sourceAmount: 100000
  };

  $scope.marketExchangeRateActual = 0;

  // this sohould be a service
  $http.post(quoteRemittanceUrl, self.basicQuotation).then(function successCallback(response) {
    // we present market exchange rate
    // TODO: change to marketExchangeRateActual after fixing remittancemaker response
    $scope.marketExchangeRateActual = response.data.quotation.marketExchangeRate;

  }, function errorCallback(error) {
    console.log(error);
    $scope.marketExchangeRateActual = -1;
  });


});
