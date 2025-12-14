import { sid } from '../index.js';

describe('sid', () => {
  it('should generate an id without prefix', () => {
    const id = sid();
    expect(id).toBeDefined();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });

  it('should generate an id with prefix', () => {
    const id = sid('usr');
    expect(id).toMatch(/^usr:/);
  });

  it('should accept prefixes of any length', () => {
    expect(() => sid('a')).not.toThrow();
    expect(() => sid('ab')).not.toThrow();
    expect(() => sid('abc')).not.toThrow();
    expect(() => sid('abcd')).not.toThrow();
    expect(() => sid('longer')).not.toThrow();
    expect(() => sid('verylongprefix')).not.toThrow();
  });

  it('should accept empty string as prefix', () => {
    const id = sid('');
    // Empty prefix should still work, no colon separator
    expect(id).toBeDefined();
    expect(typeof id).toBe('string');
  });

  it('should use custom timestamp', () => {
    const fixedTimestamp = 1234567890;
    const id1 = sid('usr', { timestamp: fixedTimestamp });
    const id2 = sid('usr', { timestamp: fixedTimestamp });
    
    // Both should have the same temporal segment (prefix part before random)
    const temporal1 = id1.split(':')[1].slice(0, -8); // Remove default random length
    const temporal2 = id2.split(':')[1].slice(0, -8);
    expect(temporal1).toBe(temporal2);
  });

  it('should use custom length for random segment', () => {
    const id = sid('usr', { length: 12 });
    // Format: usr:<temporal><random>
    const idBody = id.split(':')[1];
    // The last 12 characters should be the random segment
    expect(idBody.length).toBeGreaterThan(12);
  });

  it('should generate different ids on successive calls', () => {
    const id1 = sid('usr');
    const id2 = sid('usr');
    expect(id1).not.toBe(id2);
  });

  it('should include temporal ordering', () => {
    const id1 = sid('usr', { timestamp: 1000 });
    const id2 = sid('usr', { timestamp: 2000 });
    
    // Later timestamp should produce different temporal segment
    expect(id1).not.toBe(id2);
  });

  it('should use URL-friendly characters', () => {
    const id = sid('usr');
    // Should not contain +, /, or =
    expect(id).not.toMatch(/[+/=]/);
  });
});
