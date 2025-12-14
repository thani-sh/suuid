/**
 * Converts a number to a URL-friendly base64 string
 */
export function encodeBase64UrlFriendly(num: number): string {
  // Convert number to buffer and then to base64
  const buffer = Buffer.from(num.toString(36));
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
