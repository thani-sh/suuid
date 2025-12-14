import { encodeBase64UrlFriendly, generateRandomBase64 } from './base64.js';

export interface Options {
  timestamp?: number;
  length?: number;
}

export function sid(prefix?: string, options?: Options): string {
  const timestamp = options?.timestamp ?? Date.now();
  const randomLength = options?.length ?? 8;
  const temporalSegment = encodeBase64UrlFriendly(timestamp);
  const randomSegment = generateRandomBase64(randomLength);
  const idBody = `${temporalSegment}${randomSegment}`;
  return prefix && prefix.length > 0 ? `${prefix}:${idBody}` : idBody;
}

export default sid;
