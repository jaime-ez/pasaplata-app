'use strict';

/**
 * @ngdoc components
 * @name remittanceApp.components
 * @description
 * # components
 */
angular.module('remittanceApp')
.component('bankSelectorChile', {
  templateUrl: 'views/modals/bank_selector_chile.html',
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

    $ctrl.ok = function (item) {
      if (item) {
        $ctrl.selected.item = item;
      }
      $ctrl.close({$value: $ctrl.selected.item});
    };

    $ctrl.cancel = function () {
      $ctrl.dismiss({$value: 'cancel'});
    };
  }
})

.component('bankSelectorColombia', {
  templateUrl: 'views/modals/bank_selector_colombia.html',
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

    $ctrl.ok = function (item) {
      if (item) {
        $ctrl.selected.item = item;
      }
      $ctrl.close({$value: $ctrl.selected.item});
    };

    $ctrl.cancel = function () {
      $ctrl.dismiss({$value: 'cancel'});
    };
  }
});
