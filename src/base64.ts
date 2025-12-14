const BUFFER = Buffer.allocUnsafe(8);
const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

/**
 * Converts a number to a URL-friendly base64 string.
 */
export function encodeBase64UrlFriendly(num: number): string {
  BUFFER.writeBigUInt64BE(BigInt(num));
  return BUFFER.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Generates a random URL-friendly base64 string of specified length.
 */
export function generateRandomBase64(length: number): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}
