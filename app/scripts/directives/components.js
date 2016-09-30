'use strict';

/**
 * @ngdoc components
 * @name remittanceApp.components
 * @description
 * # components
 */
angular.module('remittanceApp')
.component('bankSelector', {
  templateUrl: './views/bank_selector_chile.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function () {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.items = $ctrl.resolve.items;
      $ctrl.selected = {
        item: $ctrl.items[0]
      };
    };

    $ctrl.ok = function () {
      $ctrl.close({$value: $ctrl.selected.item});
    };

    $ctrl.cancel = function () {
      $ctrl.dismiss({$value: 'cancel'});
    };
  }
});
