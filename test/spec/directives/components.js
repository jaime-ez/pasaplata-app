'use strict';

describe('Directive: components', function () {

  // load the directive's module
  beforeEach(module('remittanceApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<components></components>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the components directive');
  }));
});
