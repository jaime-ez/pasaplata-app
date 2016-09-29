'use strict';

/**
 * @ngdoc overview
 * @name remittanceApp
 * @description
 * # remittanceApp
 *
 * Main module of the application.
 */
angular
  .module('remittanceApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-storage',
    'timer',
    'ngclipboard',
    'platanus.rut',
    'formatAsCurrencyCode',
    'ng-phone',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/send', {
        templateUrl: 'views/send.html',
        controller: 'SendCtrl',
        controllerAs: 'send'
      })
      .when('/terms', {
        templateUrl: 'views/terms.html',
        controller: 'TermsCtrl',
        controllerAs: 'terms'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
