/**
 * Converts a number to a URL-friendly base64 string
 */
export function encodeBase64UrlFriendly(num: number): string {
  // Convert number to buffer (8 bytes for a 64-bit number)
  const buffer = Buffer.allocUnsafe(8);
  buffer.writeBigUInt64BE(BigInt(num));
  
  // Convert to base64 and make URL-friendly
  return buffer.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Generates a random URL-friendly base64 string of specified length
 */
export function generateRandomBase64(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
