import {
  v1 as uuidv1,
  v3 as uuidv3,
  v4 as uuidv4,
  v5 as uuidv5,
  v6 as uuidv6,
  v7 as uuidv7,
} from "uuid";
import { encodeBase62, decodeBase62 } from "./base62.js";

/**
 * v1 generates a new SUUID based on UUID v1 (timestamp and MAC address).
 */
export function v1(): string {
  const uuid = uuidv1();
  return encodeBase62(uuid);
}

/**
 * v3 generates a new SUUID based on UUID v3 (namespace and name, MD5).
 */
export function v3(name: string, namespace: string): string {
  const uuid = uuidv3(name, namespace);
  return encodeBase62(uuid);
}

/**
 * v4 generates a new SUUID based on UUID v4 (random).
 */
export function v4(): string {
  const uuid = uuidv4();
  return encodeBase62(uuid);
}

/**
 * v5 generates a new SUUID based on UUID v5 (namespace and name, SHA-1).
 */
export function v5(name: string, namespace: string): string {
  const uuid = uuidv5(name, namespace);
  return encodeBase62(uuid);
}

/**
 * v6 generates a new SUUID based on UUID v6 (timestamp and MAC address, sortable).
 */
export function v6(): string {
  const uuid = uuidv6();
  return encodeBase62(uuid);
}

/**
 * v7 generates a new SUUID based on UUID v7 (timestamp-based, sortable).
 */
export function v7(): string {
  const uuid = uuidv7();
  return encodeBase62(uuid);
}

/**
 * encode encodes a standard UUID (8-4-4-4-12 format) to a SUUID (base62 encoded).
 */
export function encode(uuid: string): string {
  return encodeBase62(uuid);
}

/**
 * decode decodes a SUUID (base62 encoded) back to standard UUID format (8-4-4-4-12).
 */
export function decode(suuid: string): string {
  return decodeBase62(suuid);
}
