'use strict';

describe('Service: chileComunas', function () {

  // load the service's module
  beforeEach(module('remittanceApp'));

  // instantiate service
  var chileComunas;
  beforeEach(inject(function (_chileComunas_) {
    chileComunas = _chileComunas_;
  }));

  it('should do something', function () {
    expect(!!chileComunas).toBe(true);
  });

});
