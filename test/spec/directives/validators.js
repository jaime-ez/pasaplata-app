'use strict';

describe('Directive: validators', function () {

  // load the directive's module
  beforeEach(module('remittanceApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

/* this was the default directive when created
  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<validators></validators>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the validators directive');
  }));
*/
});
