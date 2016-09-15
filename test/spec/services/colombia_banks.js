'use strict';

describe('Service: colombiaBanks', function () {

  // load the service's module
  beforeEach(module('remittanceApp'));

  // instantiate service
  var colombiaBanks;
  beforeEach(inject(function (_colombiaBanks_) {
    colombiaBanks = _colombiaBanks_;
  }));

  it('should do something', function () {
    expect(!!colombiaBanks).toBe(true);
  });

});
