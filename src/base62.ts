const BASE62_ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const UUID_HEX_LENGTH = 32; // 128 bits / 4 bits per hex character

/**
 * Encodes a UUID (in hex format without dashes) to base62 string.
 */
export function encodeBase62(uuid: string): string {
  // Remove dashes from UUID
  const hex = uuid.replace(/-/g, '');
  
  // Convert hex string to BigInt
  let num = BigInt('0x' + hex);
  
  if (num === 0n) {
    return '0';
  }
  
  let result = '';
  const base = BigInt(62);
  
  while (num > 0n) {
    const remainder = Number(num % base);
    result = BASE62_ALPHABET[remainder] + result;
    num = num / base;
  }
  
  return result;
}

/**
 * Decodes a base62 string back to UUID format (8-4-4-4-12).
 */
export function decodeBase62(encoded: string): string {
  let num = 0n;
  const base = BigInt(62);
  
  for (let i = 0; i < encoded.length; i++) {
    const char = encoded[i];
    const value = BASE62_ALPHABET.indexOf(char);
    if (value === -1) {
      throw new Error(`Invalid base62 character: ${char}`);
    }
    num = num * base + BigInt(value);
  }
  
  // Convert back to hex and pad to UUID_HEX_LENGTH characters
  let hex = num.toString(16).padStart(UUID_HEX_LENGTH, '0');
  
  // Format as UUID: 8-4-4-4-12
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32)
  ].join('-');
}
