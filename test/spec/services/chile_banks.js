'use strict';

describe('Service: chileBanks', function () {

  // load the service's module
  beforeEach(module('remittanceApp'));

  // instantiate service
  var chileBanks;
  beforeEach(inject(function (_chileBanks_) {
    chileBanks = _chileBanks_;
  }));

  it('should do something', function () {
    expect(!!chileBanks).toBe(true);
  });

});
