const assert = require('assert');
const app = require('../../src/app');

describe('\'timeEntries\' service', () => {
  it('registered the service', () => {
    const service = app.service('time-entries');

    assert.ok(service, 'Registered the service');
  });
});
