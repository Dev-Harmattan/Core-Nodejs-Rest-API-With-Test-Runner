import test from 'node:test';
import assert from 'node:assert';
import { routes } from '../../src/routes/heroRoute';
const callTracker = new assert.CallTracker();
process.on('exit', () => callTracker.verify());

test('Hero unit test suite', async (t) => {
  await t.test('It should call /heroes:get endpoint', async (t) => {
    const mockResponseData = [
      {
        id: '212b6232-5f48-4b10-b2e7-d79383a50830',
        name: 'lekan',
        age: 40,
        power: 'rich',
      },
    ];

    const heroServiceStub = {
      find: async () => mockResponseData,
    };

    const heroRoutes = routes({
      heroService: heroServiceStub,
    });

    const endpoint = '/heroes:get';
    const req = {};
    const res = {
      write: callTracker.calls((items) => {
        const expectedData = JSON.stringify({ results: mockResponseData });
        assert.strictEqual(
          items,
          expectedData,
          'write should be call with correct payload'
        );
      }),
      end: callTracker.calls((items) => {
        assert.strictEqual(
          items,
          undefined,
          'end should be call without params'
        );
      }),
    };
    await heroRoutes[endpoint](req, res);
  });
});
