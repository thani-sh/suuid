import { describe, it } from 'node:test';
import assert from 'node:assert';
import { v1, v3, v4, v5, v6, v7, encode, decode } from './index.js';

describe('v1', () => {
  it('should generate a base62-encoded UUID v1', () => {
    const id = v1();
    assert.ok(id);
    assert.strictEqual(typeof id, 'string');
    assert.ok(id.length > 0);
    assert.ok(id.length < 36); // Should be shorter than standard UUID
  });

  it('should generate different ids on successive calls', () => {
    const id1 = v1();
    const id2 = v1();
    assert.notStrictEqual(id1, id2);
  });

  it('should generate valid base62 strings', () => {
    const id = v1();
    assert.match(id, /^[0-9A-Za-z]+$/);
  });
});

describe('v3', () => {
  it('should generate a base62-encoded UUID v3', () => {
    const id = v3('hello', '6ba7b810-9dad-11d1-80b4-00c04fd430c8');
    assert.ok(id);
    assert.strictEqual(typeof id, 'string');
    assert.ok(id.length > 0);
    assert.ok(id.length < 36);
  });

  it('should generate same id for same input', () => {
    const id1 = v3('hello', '6ba7b810-9dad-11d1-80b4-00c04fd430c8');
    const id2 = v3('hello', '6ba7b810-9dad-11d1-80b4-00c04fd430c8');
    assert.strictEqual(id1, id2);
  });

  it('should generate valid base62 strings', () => {
    const id = v3('test', '6ba7b810-9dad-11d1-80b4-00c04fd430c8');
    assert.match(id, /^[0-9A-Za-z]+$/);
  });
});

describe('v4', () => {
  it('should generate a base62-encoded UUID v4', () => {
    const id = v4();
    assert.ok(id);
    assert.strictEqual(typeof id, 'string');
    assert.ok(id.length > 0);
    assert.ok(id.length < 36); // Should be shorter than standard UUID
  });

  it('should generate different ids on successive calls', () => {
    const id1 = v4();
    const id2 = v4();
    assert.notStrictEqual(id1, id2);
  });

  it('should generate valid base62 strings', () => {
    const id = v4();
    assert.match(id, /^[0-9A-Za-z]+$/);
  });
});

describe('v5', () => {
  it('should generate a base62-encoded UUID v5', () => {
    const id = v5('hello', '6ba7b810-9dad-11d1-80b4-00c04fd430c8');
    assert.ok(id);
    assert.strictEqual(typeof id, 'string');
    assert.ok(id.length > 0);
    assert.ok(id.length < 36);
  });

  it('should generate same id for same input', () => {
    const id1 = v5('hello', '6ba7b810-9dad-11d1-80b4-00c04fd430c8');
    const id2 = v5('hello', '6ba7b810-9dad-11d1-80b4-00c04fd430c8');
    assert.strictEqual(id1, id2);
  });

  it('should generate valid base62 strings', () => {
    const id = v5('test', '6ba7b810-9dad-11d1-80b4-00c04fd430c8');
    assert.match(id, /^[0-9A-Za-z]+$/);
  });
});

describe('v6', () => {
  it('should generate a base62-encoded UUID v6', () => {
    const id = v6();
    assert.ok(id);
    assert.strictEqual(typeof id, 'string');
    assert.ok(id.length > 0);
    assert.ok(id.length < 36);
  });

  it('should generate different ids on successive calls', () => {
    const id1 = v6();
    const id2 = v6();
    assert.notStrictEqual(id1, id2);
  });

  it('should generate valid base62 strings', () => {
    const id = v6();
    assert.match(id, /^[0-9A-Za-z]+$/);
  });
});

describe('v7', () => {
  it('should generate a base62-encoded UUID v7', () => {
    const id = v7();
    assert.ok(id);
    assert.strictEqual(typeof id, 'string');
    assert.ok(id.length > 0);
    assert.ok(id.length < 36); // Should be shorter than standard UUID
  });

  it('should generate different ids on successive calls', () => {
    const id1 = v7();
    const id2 = v7();
    assert.notStrictEqual(id1, id2);
  });

  it('should generate valid base62 strings', () => {
    const id = v7();
    assert.match(id, /^[0-9A-Za-z]+$/);
  });
});

describe('encode', () => {
  it('should encode a UUID to base62', () => {
    const uuid = '550e8400-e29b-41d4-a716-446655440000';
    const encoded = encode(uuid);
    assert.ok(encoded);
    assert.strictEqual(typeof encoded, 'string');
    assert.ok(encoded.length < uuid.length);
  });

  it('should produce valid base62 strings', () => {
    const uuid = '550e8400-e29b-41d4-a716-446655440000';
    const encoded = encode(uuid);
    assert.match(encoded, /^[0-9A-Za-z]+$/);
  });

  it('should handle different UUIDs', () => {
    const uuid1 = '00000000-0000-0000-0000-000000000000';
    const uuid2 = 'ffffffff-ffff-ffff-ffff-ffffffffffff';
    const encoded1 = encode(uuid1);
    const encoded2 = encode(uuid2);
    assert.notStrictEqual(encoded1, encoded2);
  });
});

describe('decode', () => {
  it('should decode a base62 string back to UUID', () => {
    const uuid = '550e8400-e29b-41d4-a716-446655440000';
    const encoded = encode(uuid);
    const decoded = decode(encoded);
    assert.strictEqual(decoded, uuid);
  });

  it('should handle round-trip encoding/decoding', () => {
    const uuid1 = '00000000-0000-0000-0000-000000000000';
    const uuid2 = 'ffffffff-ffff-ffff-ffff-ffffffffffff';
    const uuid3 = '123e4567-e89b-12d3-a456-426614174000';
    
    assert.strictEqual(decode(encode(uuid1)), uuid1);
    assert.strictEqual(decode(encode(uuid2)), uuid2);
    assert.strictEqual(decode(encode(uuid3)), uuid3);
  });

  it('should throw error for invalid base62 characters', () => {
    assert.throws(() => decode('invalid-chars!@#'), {
      message: /Invalid base62 character/
    });
  });
});

describe('integration', () => {
  it('should allow encoding and decoding v1 UUIDs', () => {
    const suuid = v1();
    const uuid = decode(suuid);
    assert.match(uuid, /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    assert.strictEqual(encode(uuid), suuid);
  });

  it('should allow encoding and decoding v4 UUIDs', () => {
    const suuid = v4();
    const uuid = decode(suuid);
    assert.match(uuid, /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    assert.strictEqual(encode(uuid), suuid);
  });

  it('should allow encoding and decoding v7 UUIDs', () => {
    const suuid = v7();
    const uuid = decode(suuid);
    assert.match(uuid, /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    assert.strictEqual(encode(uuid), suuid);
  });
});
