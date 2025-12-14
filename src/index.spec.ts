import { describe, it } from 'node:test';
import assert from 'node:assert';
import { sid } from './index.js';

describe('sid', () => {
  it('should generate an id without prefix', () => {
    const id = sid();
    assert.ok(id);
    assert.strictEqual(typeof id, 'string');
    assert.ok(id.length > 0);
  });

  it('should generate an id with prefix', () => {
    const id = sid('usr');
    assert.match(id, /^usr:/);
  });

  it('should accept prefixes of any length', () => {
    assert.doesNotThrow(() => sid('a'));
    assert.doesNotThrow(() => sid('ab'));
    assert.doesNotThrow(() => sid('abc'));
    assert.doesNotThrow(() => sid('abcd'));
    assert.doesNotThrow(() => sid('longer'));
    assert.doesNotThrow(() => sid('verylongprefix'));
  });

  it('should accept empty string as prefix', () => {
    const id = sid('');
    assert.ok(id);
    assert.strictEqual(typeof id, 'string');
  });

  it('should use custom timestamp', () => {
    const fixedTimestamp = 1234567890;
    const id1 = sid('usr', { timestamp: fixedTimestamp });
    const id2 = sid('usr', { timestamp: fixedTimestamp });
    const temporal1 = id1.split(':')[1].slice(0, -8);
    const temporal2 = id2.split(':')[1].slice(0, -8);
    assert.strictEqual(temporal1, temporal2);
  });

  it('should use custom length for random segment', () => {
    const id = sid('usr', { length: 12 });
    const idBody = id.split(':')[1];
    assert.ok(idBody.length > 12);
  });

  it('should generate different ids on successive calls', () => {
    const id1 = sid('usr');
    const id2 = sid('usr');
    assert.notStrictEqual(id1, id2);
  });

  it('should include temporal ordering', () => {
    const id1 = sid('usr', { timestamp: 1000 });
    const id2 = sid('usr', { timestamp: 2000 });
    assert.ok(id1 < id2);
  });

  it('should use URL-friendly characters', () => {
    const id = sid('usr');
    assert.doesNotMatch(id, /[+/=]/);
  });
});
