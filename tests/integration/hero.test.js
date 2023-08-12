import test from 'node:test';
import assert from 'node:assert';
import { promisify } from 'node:util';

test('Hero integration test suit', async (t) => {
  const port = 9000;
  process.env.PORT = port;
  const { server } = await import('../../src/index.js');
  const heroAddress = `http://localhost:${port}/heroes`;

  await t.test('It should create a Hero', async (t) => {
    const data = {
      name: 'Batman',
      age: 50,
      power: 'rich',
    };

    const response = await fetch(heroAddress, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    assert.deepStrictEqual(
      response.headers.get('content-type'),
      'application/json'
    );

    assert.strictEqual(response.status, 201);

    const result = await response.json();

    assert.deepStrictEqual(
      result.success,
      'User created with success!!',
      'It should return valid success message'
    );

    assert.ok(result.id.length > 30, 'It should return valid id');
  });

  await t.test('It should return all heroes', async (t) => {
    const response = await fetch(heroAddress);

    assert.deepStrictEqual(
      response.headers.get('content-type'),
      'application/json'
    );

    assert.strictEqual(response.status, 200);

    const result = await response.json();
    assert.ok(Array.isArray(result.results), 'Response should be an array');
  });

  promisify(server.close.bind(server))();
});
