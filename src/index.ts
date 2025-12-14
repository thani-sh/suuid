import { v4 as uuidv4, v7 as uuidv7 } from 'uuid';
import { encodeBase62, decodeBase62 } from './base62.js';

/**
 * Generates a new SUUID based on UUID v4 (random).
 * Returns a base62-encoded short UUID.
 */
export function v4(): string {
  const uuid = uuidv4();
  return encodeBase62(uuid);
}

/**
 * Generates a new SUUID based on UUID v7 (timestamp-based).
 * Note: UUID v8 is custom/vendor-specific, so using v7 which is timestamp-based.
 * Returns a base62-encoded short UUID.
 */
export function v8(): string {
  const uuid = uuidv7();
  return encodeBase62(uuid);
}

/**
 * Encodes a standard UUID (8-4-4-4-12 format) to a SUUID (base62 encoded).
 * @param uuid - A UUID string in the format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 * @returns A base62-encoded short UUID
 */
export function encode(uuid: string): string {
  return encodeBase62(uuid);
}

/**
 * Decodes a SUUID (base62 encoded) back to standard UUID format (8-4-4-4-12).
 * @param suuid - A base62-encoded short UUID
 * @returns A UUID string in the format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 */
export function decode(suuid: string): string {
  return decodeBase62(suuid);
}
